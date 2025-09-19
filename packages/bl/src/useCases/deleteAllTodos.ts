import { ICrudTodoApiBoundary } from "../boundaries/ICrudTodoApiBoundary";

export function makeDeleteAllTodos({
  deleteAllTodos,
}: Pick<ICrudTodoApiBoundary, "deleteAllTodos">) {
  return () => deleteAllTodos();
}
