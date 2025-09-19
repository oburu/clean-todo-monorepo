import { ICrudTodoApiBoundary } from "../boundaries/ICrudTodoApiBoundary";
import type { Todo } from "../entities/Todo";

export function makeCreateTodo({
  createTodo,
}: Pick<ICrudTodoApiBoundary, "createTodo">) {
  return (todo: Todo) => createTodo(todo);
}
