import { Request } from 'express';
import { makeTodo, makeId, makeTodoCrudApi } from '@clean-todo/business';
import { inMemoryCrudApi, inSystemCrudApi, inMongo } from '@clean-todo/db';

// Connect selected Api with domain logic and get usecases
const { createTodo, getAllTodos, updateTodo, deleteTodo, updateAllTodos } =
  makeTodoCrudApi(inMongo);

export function addTodoRouteController(req: Request) {
  const todo = makeTodo(makeId).please({ description: req.body.description });
  return createTodo(todo);
}

export function getAllRouteController(req?: Request) {
  return getAllTodos();
}

export function updateTodoController(req: Request) {
  return updateTodo(req.body);
}

export async function deleteTodoRouteController(req: Request) {
  await deleteTodo(req.body.id);
  return {
    status: `Todo with id ${req.body.id} deleted`,
  };
}

export async function updateAllTodosController(req: Request) {
  await updateAllTodos(req.body);
  return {
    status: 'All todos updated',
  };
}
