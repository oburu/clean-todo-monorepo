import { Todo } from "../entities/Todo";

export interface ICrudTodoApiBoundary {
  createTodo: (todo: Todo) => Promise<Todo>;
  updateTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  getAllTodos: () => Promise<Todo[]>;
  deleteAllTodos: () => Promise<void>;
  updateAllTodos: (todos: Todo[]) => Promise<void>;
}
