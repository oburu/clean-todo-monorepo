import { crudApi } from "@clean-todo/db";
import { ValueOf, choices } from "./constants";
import {
  addTodoController,
  clearAllController,
  deleteTodoController,
  listTodosController,
  toggleTodoController,
} from "./controllers";
import { goodBye } from "./utils/views";

// crudApi is an object that contains methods to interact with the selected database.

const { createTodo, getAllTodos, updateTodo, deleteTodo, deleteAllTodos } =
  crudApi;

export async function handleSelectedChoice(choice: ValueOf<typeof choices>) {
  const choiceList = {
    [choices.add]: async () => await addTodoController(createTodo),
    [choices.list]: async () => await listTodosController(getAllTodos),
    [choices.delete]: async () =>
      await deleteTodoController({ deleteTodo, getAllTodos }),
    [choices.toggle]: async () =>
      await toggleTodoController({ updateTodo, getAllTodos }),
    [choices.clearAll]: async () => await clearAllController(deleteAllTodos),
    [choices.exit]: async () => await goodBye(),
  };

  await choiceList[choice]();
}
