import OpenAI from "jsr:@openai/openai@4";
import "jsr:@supabase/functions-js@2/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const instructions = `
  You are an helpful assistant tasked with summarizing a list of pending tasks for the user.
  Use a cheerful but professional tone, and remember to always end the summary with a
  motivational quote that is relevant to the tasks that the user must complete.
  Please do not use markdown but just plain text.
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("OK", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("VITE_SUPABASE_URL")!.replace("http://127.0.0.1", "http://host.docker.internal");
  const supabaseClient = createClient(supabaseUrl, Deno.env.get("VITE_SUPABASE_ANON_KEY")!, {
    global: {
      headers: { Authorization: req.headers.get("Authorization")! },
    },
  });

  const user = await supabaseClient.auth.getUser();

  if (!user.data.user) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const todos = await supabaseClient
    .from("todos")
    .select("*")
    .order("created_at")
    .is("completed_at", null)
    .throwOnError();

  const ai = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY"),
  });

  const response = await ai.responses.create({
    model: "chatgpt-4o-latest",
    instructions,
    input: todos.data.map((t) => t.task).join(", "),
  });

  const message = response.output_text;

  return new Response(JSON.stringify({ message }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
