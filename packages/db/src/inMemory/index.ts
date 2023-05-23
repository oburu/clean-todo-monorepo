import { ICrudTodoApiBoundary } from '@clean-todo/business';
import type { Todo } from '@clean-todo/business';

export function inMemoryCrudApi(): ICrudTodoApiBoundary {
  const todos: Todo[] = [];

  return {
    async createTodo(todo: Todo) {
      todos.push(todo);
      return todo;
    },
    async updateTodo(newTodo: Todo) {
      const foundIndex = todos.findIndex((todo) => todo.id === newTodo.id);

      if (foundIndex < 0) throw new Error('Todo does not exist');

      todos[foundIndex] = newTodo;

      return newTodo;
    },
    async deleteTodo(id) {
      const foundIndex = todos.findIndex((todo) => todo.id === id);

      if (foundIndex < 0) throw new Error('Todo does not exist');

      todos.splice(foundIndex, 1);
    },
    async getAllTodos() {
      return todos;
    },
    async deleteAllTodos() {
      todos.length = 0;
    },
    async updateAllTodos(newOrderedTodos: Todo[]) {
      newOrderedTodos.forEach((todo, i) => {
        todos[i] = todo;
      });
    },
  };
}
