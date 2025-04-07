import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import AddTodoForm from "~/components/add-todo-form";
import SummaryForm from "~/components/summary-form";
import TodoItem from "~/components/todo-item";
import { supabaseClient } from "../lib/supabase";

const todosQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: async () => supabaseClient.from("todos").select("*").order("created_at").throwOnError(),
});

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: ({ context }) => context.queryClient.ensureQueryData(todosQueryOptions),
  beforeLoad: async () => {
    const user = await supabaseClient.auth.getUser();
    if (!user.data.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const query = useSuspenseQuery(todosQueryOptions);
  const todos = query.data.data;

  useEffect(() => {
    const channel = supabaseClient
      .channel("todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            <AddTodoForm />
            <SummaryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
