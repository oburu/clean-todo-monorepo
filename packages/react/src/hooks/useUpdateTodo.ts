import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BE_URL, Todo } from '../constants';

async function updateTodoFn(data: Todo) {
  try {
    const response = await fetch(BE_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  const {
    isLoading: isUpdating,
    isSuccess: isSuccessUpdating,
    isError: isErrorUpdating,
    error: errorUpdating,
    mutate: updateTodo,
  } = useMutation({
    mutationFn: updateTodoFn,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  return {
    isUpdating,
    isSuccessUpdating,
    isErrorUpdating,
    errorUpdating,
    updateTodo,
  };
}
