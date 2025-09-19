import { Todo } from "@clean-todo/bl";
import { Request } from "express";
import {
  addTodoRouteController,
  deleteTodoRouteController,
  getAllRouteController,
  updateTodoController,
} from "../makeRoutesControllers";

const mockReq = {
  body: {
    description: "hola, this is a todo test",
  },
} as Request;

let todo: Todo;

beforeEach(async () => {
  todo = await addTodoRouteController(mockReq);
});

describe("Testing makeRoutesControllers", () => {
  it("should create a todo using todoRouteController", async () => {
    expect(todo.description).toEqual(mockReq.body.description);
  });

  it("should display all todos", async () => {
    const list = await getAllRouteController();

    expect(list).toEqual(expect.arrayContaining([todo]));
  });

  it("should update a todo", async () => {
    const mockReq = {
      body: {
        ...todo,
        description: "this is diferent",
        done: true,
      },
    } as Request;

    const updatedTodo = await updateTodoController(mockReq);

    expect(updatedTodo.description).toEqual(mockReq.body.description);
    expect(updatedTodo.done).toEqual(mockReq.body.done);
  });

  it("should delete a todo", async () => {
    const mockReq = {
      body: {
        id: todo.id,
      },
    } as Request;

    await deleteTodoRouteController(mockReq);
    const listAfter = await getAllRouteController();

    expect(listAfter.find((todo) => todo.id === mockReq.body.id)).toBe(
      undefined
    );
  });
});
