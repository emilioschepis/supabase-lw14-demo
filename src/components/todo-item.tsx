import { useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/lib/supabase";
import type { Database } from "~/lib/supabase.gen";

type Props = {
  todo: Database["public"]["Tables"]["todos"]["Row"];
};

export default function TodoItem(props: Props) {
  const queryClient = useQueryClient();

  async function submitForm(formData: FormData) {
    const checked = !!formData.get(props.todo.id);
    const completed_at = checked ? new Date().toISOString() : null;

    await supabaseClient.from("todos").update({ completed_at }).eq("id", props.todo.id);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  return (
    <form action={submitForm}>
      <label className="flex items-center gap-2 rounded-lg border border-gray-300 p-3 has-checked:bg-gray-100 has-checked:line-through">
        <input
          name={props.todo.id}
          type="checkbox"
          checked={!!props.todo.completed_at}
          onChange={(e) => e.target.form?.requestSubmit()}
        />
        <div className="flex flex-1 items-center justify-between">
          <span>{props.todo.task}</span>
          {props.todo.attachment_url ? (
            <a href={props.todo.attachment_url} target="_blank" rel="noopener noreferrer">
              <img alt={props.todo.task} src={props.todo.attachment_url} className="h-12 w-12 object-contain" />
            </a>
          ) : null}
        </div>
      </label>
    </form>
  );
}
