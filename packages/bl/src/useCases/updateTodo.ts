import { ICrudTodoApiBoundary } from '../boundaries/ICrudTodoApiBoundary';
import { Todo } from '../entities/Todo';

export function makeUpdateTodo({ updateTodo }: Pick<ICrudTodoApiBoundary, 'updateTodo'>) {
  return (todo: Todo) => {
    const updatedTodo = {
      ...todo,
      modifiedOn: Date.now(),
    };

    return updateTodo(updatedTodo);
  };
}
