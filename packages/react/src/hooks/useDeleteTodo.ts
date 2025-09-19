import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BE_URL } from "../constants";

async function deleteTodoFn(id: string) {
  try {
    const response = await fetch(BE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const {
    isLoading: isDeleting,
    isSuccess: isSuccessDeleting,
    isError: isErrorDeleting,
    error: errorDeleting,
    mutate: deleteTodo,
  } = useMutation({
    mutationFn: deleteTodoFn,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  return {
    isDeleting,
    isSuccessDeleting,
    isErrorDeleting,
    errorDeleting,
    deleteTodo,
  };
}
