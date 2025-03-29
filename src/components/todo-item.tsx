import type { Database } from "~/lib/supabase.gen";

type Props = {
  todo: Database["public"]["Tables"]["todos"]["Row"];
};

export default function TodoItem(props: Props) {
  async function submitForm(formData: FormData) {}

  return (
    <form action={submitForm}>
      <label className="flex items-center gap-2 rounded-lg border border-gray-300 p-3 has-checked:bg-gray-100 has-checked:line-through">
        <input
          name={props.todo.id}
          type="checkbox"
          checked={!!props.todo.completed_at}
          onChange={(e) => e.target.form?.requestSubmit()}
        />
        <span>{props.todo.task}</span>
      </label>
    </form>
  );
}
