import { useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/lib/supabase";
import { generateRandomString } from "~/utils/string-utils";
import FileInput from "./file-input";

export default function AddTodoForm() {
  const queryClient = useQueryClient();

  async function submitForm(formData: FormData) {
    const task = formData.get("task") as string;
    const attachment = formData.get("attachment") as File | null;
    let attachment_url: string | undefined;

    if (attachment && attachment.size > 0) {
      const ext = attachment.name.split(".").pop();
      const path = `${generateRandomString()}.${ext}`;
      const uploaded = await supabaseClient.storage.from("attachments").upload(path, attachment);

      if (uploaded.data?.path) {
        const publicUrl = supabaseClient.storage.from("attachments").getPublicUrl(uploaded.data.path);
        attachment_url = publicUrl.data.publicUrl;
      }
    }

    await supabaseClient.from("todos").insert({ task, attachment_url });
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  return (
    <form action={submitForm} className="flex items-stretch gap-2">
      <label htmlFor="task" className="hidden">
        Task
      </label>
      <input
        id="task"
        name="task"
        placeholder="Add a todo…"
        required
        minLength={1}
        className="h-[50px] flex-1 rounded-lg border border-gray-300 px-3"
      />
      <FileInput />
      <button
        type="submit"
        className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-500 active:bg-indigo-500"
      >
        <span className="sr-only">Add</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>
    </form>
  );
}
