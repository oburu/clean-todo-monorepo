import { useQuery } from "@tanstack/react-query";
import { BE_URL, TodoResponse } from "../constants";

// const controller = new AbortController();
// const signal = controller.signal;

async function getAllTodos(signal: AbortSignal | undefined) {
  const res = await fetch(BE_URL, { signal });
  const todos: TodoResponse = await res.json();

  return todos.content;
}

export function useGetAllTodos() {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: ({ signal }) => getAllTodos(signal),
  });
  return {
    todos,
    isLoading,
    isError,
    error,
  };
}
