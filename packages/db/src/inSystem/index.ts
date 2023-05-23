import { ICrudTodoApiBoundary } from '@clean-todo/business';
import type { Todo } from '@clean-todo/business';
import fs from 'fs';
import path from 'path';

export function inSystemCrudApi(): ICrudTodoApiBoundary {
  return {
    async createTodo(todo: Todo) {
      const todos = fetchTodos();
      const duplicatetodos = todos.filter((storedTodo) => storedTodo.id === todo.id);

      if (duplicatetodos.length === 0) {
        todos.push(todo);
        saveTodos(todos);
        return todo;
      }

      return todo;
    },
    async updateTodo(newTodo: Todo) {
      const todos = fetchTodos();
      const foundIndex = todos.findIndex((todo) => todo.id === newTodo.id);

      if (foundIndex < 0) throw new Error('Todo does not exist');

      todos[foundIndex] = newTodo;
      saveTodos(todos);

      return newTodo;
    },
    async deleteTodo(id) {
      const todos = fetchTodos();
      const foundIndex = todos.findIndex((todo) => todo.id === id);

      if (foundIndex < 0) throw new Error('Todo does not exist');

      todos.splice(foundIndex, 1);
      saveTodos(todos);
    },
    async getAllTodos() {
      return fetchTodos();
    },
    async deleteAllTodos() {
      saveTodos([]);
    },
    async updateAllTodos(newOrderedTodos: Todo[]) {
      saveTodos(newOrderedTodos);
    },
  };
}

const FILE_PATH = path.join(__dirname, 'todos-data.json');

function fetchTodos(): Todo[] {
  try {
    const todosString = fs.readFileSync(FILE_PATH);
    return JSON.parse(todosString.toString());
  } catch (error) {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos));
}
