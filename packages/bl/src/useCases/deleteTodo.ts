import { ICrudTodoApiBoundary } from "../boundaries/ICrudTodoApiBoundary";

export function makeDeleteTodo({
  deleteTodo,
}: Pick<ICrudTodoApiBoundary, "deleteTodo">) {
  return (id: string) => deleteTodo(id);
}
