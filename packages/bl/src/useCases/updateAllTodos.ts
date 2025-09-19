import { ICrudTodoApiBoundary } from "../boundaries/ICrudTodoApiBoundary";
import { Todo } from "../entities/Todo";

export function makeUpdateAllTodos({
  updateAllTodos,
}: Pick<ICrudTodoApiBoundary, "updateAllTodos">) {
  return (todos: Todo[]) => updateAllTodos(todos);
}
