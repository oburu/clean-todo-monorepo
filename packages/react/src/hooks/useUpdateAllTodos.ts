import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BE_URL, Todo } from '../constants';

async function updateAllTodosFn(data: Todo[]) {
  try {
    const response = await fetch(`${BE_URL}s`, {
      method: 'POST',
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

export function useUpdateAllTodos() {
  const queryClient = useQueryClient();

  const {
    isLoading: isUpdatingAllTodos,
    isSuccess: isSuccessUpdatingAllTodos,
    isError: isErrorUpdatingAllTodos,
    error: errorUpdatingAllTodos,
    mutate: updateAllTodos,
  } = useMutation({
    mutationFn: updateAllTodosFn,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  return {
    isUpdatingAllTodos,
    isSuccessUpdatingAllTodos,
    isErrorUpdatingAllTodos,
    errorUpdatingAllTodos,
    updateAllTodos,
  };
}
