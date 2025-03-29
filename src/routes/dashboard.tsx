import { createFileRoute } from "@tanstack/react-router";
import AddTodoForm from "~/components/add-todo-form";
import TodoItem from "~/components/todo-item";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Supabase LW14 Demo"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Your Todos</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <div className="space-y-4">
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <AddTodoForm />
          </div>
        </div>
      </div>
    </div>
  );
}
