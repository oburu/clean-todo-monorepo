import { ICrudTodoApiBoundary } from '../boundaries/ICrudTodoApiBoundary';

export function makeGetAllTodos({ getAllTodos }: Pick<ICrudTodoApiBoundary, 'getAllTodos'>) {
  return () => getAllTodos();
}
