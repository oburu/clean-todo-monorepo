import { makeId, makeTodo } from "@clean-todo/bl";
import { crudApi } from "@clean-todo/db";
import { Request } from "express";

// crudApi is an object that contains methods to interact with the selected database.
const { createTodo, getAllTodos, updateTodo, deleteTodo, updateAllTodos } =
  crudApi;

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
    status: "All todos updated",
  };
}
