import { makeTodoCrudApi } from '@clean-todo/business';
import { inMemoryCrudApi, inSystemCrudApi, inMongo } from '@clean-todo/db';
import { ValueOf, choices } from './constants';
import { goodBye } from './utils/views';
import {
  addTodoController,
  clearAllController,
  deleteTodoController,
  listTodosController,
  toggleTodoController,
} from './controllers';

const { createTodo, getAllTodos, updateTodo, deleteTodo, deleteAllTodos } =
  makeTodoCrudApi(inSystemCrudApi);

export async function handleSelectedChoice(choice: ValueOf<typeof choices>) {
  const choiceList = {
    [choices.add]: async () => await addTodoController(createTodo),
    [choices.list]: async () => await listTodosController(getAllTodos),
    [choices.delete]: async () => await deleteTodoController({ deleteTodo, getAllTodos }),
    [choices.toggle]: async () => await toggleTodoController({ updateTodo, getAllTodos }),
    [choices.clearAll]: async () => await clearAllController(deleteAllTodos),
    [choices.exit]: async () => await goodBye(),
  };

  await choiceList[choice]();
}
