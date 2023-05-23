import { makeTodoCrudApi } from '../../../domain/utils/makeTodoCrudApi';
import { inMemoryCrudApi } from '../../db/inMemory';
import { inSystemCrudApi } from '../../db/inSystem';
import { inMongo } from '../../db/inMongo';
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
  makeTodoCrudApi(inMongo);

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
