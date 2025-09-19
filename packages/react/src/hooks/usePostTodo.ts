import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BE_URL, Todo } from "../constants";

async function postTodo(data: Pick<Todo, "description">) {
  try {
    const response = await fetch(BE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}

export function usePostTodo() {
  const queryClient = useQueryClient();

  const {
    isLoading: isCreating,
    isSuccess: isSuccessCreating,
    isError: isErrorCreating,
    error: errorCreating,
    mutate: createTodo,
  } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  return {
    isCreating,
    isSuccessCreating,
    isErrorCreating,
    errorCreating,
    createTodo,
  };
}
