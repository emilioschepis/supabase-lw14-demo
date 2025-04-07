import { useActionState } from "react";
import { supabaseClient } from "~/lib/supabase";

export default function SummaryForm() {
  const [_, formAction, isPending] = useActionState(submitForm, undefined);

  async function submitForm() {
    const response = await supabaseClient.functions.invoke("summary");
    const message = response.data.message;
    alert(message);
  }

  return (
    <form action={formAction} className="flex justify-center">
      <button
        type="submit"
        className="flex items-center gap-2 text-indigo-600 transition-colors hover:text-indigo-500 active:text-indigo-500 disabled:text-gray-700"
        disabled={isPending}
      >
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
          <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
          <path d="m14 7 3 3" />
          <path d="M5 6v4" />
          <path d="M19 14v4" />
          <path d="M10 2v2" />
          <path d="M7 8H3" />
          <path d="M21 16h-4" />
          <path d="M11 3H9" />
        </svg>
        <span>{isPending ? "Generating..." : "Generate a summary"}</span>
      </button>
    </form>
  );
}
