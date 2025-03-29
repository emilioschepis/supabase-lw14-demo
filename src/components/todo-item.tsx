type Props = {};

export default function TodoItem(props: Props) {
  async function submitForm(formData: FormData) {}

  return (
    <form action={submitForm}>
      <label className="flex items-center gap-2 rounded-lg border border-gray-300 p-3 has-checked:bg-gray-100 has-checked:line-through">
        <input type="checkbox" onChange={(e) => e.target.form?.requestSubmit()} />
        <span>Task</span>
      </label>
    </form>
  );
}
