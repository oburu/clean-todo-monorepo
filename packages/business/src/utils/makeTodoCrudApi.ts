import { ICrudTodoApiBoundary } from '../boundaries/ICrudTodoApiBoundary';
import {
  makeCreateTodo,
  makeGetAllTodos,
  makeUpdateTodo,
  makeDeleteTodo,
  makeDeleteAllTodos,
  makeUpdateAllTodos,
} from '../useCases';

export type CrudApiType = () => ICrudTodoApiBoundary;

export function makeTodoCrudApi(crudApiType: CrudApiType) {
  const { createTodo, deleteTodo, updateTodo, getAllTodos, deleteAllTodos, updateAllTodos } =
    crudApiType();

  return {
    createTodo: makeCreateTodo({ createTodo }),
    getAllTodos: makeGetAllTodos({ getAllTodos }),
    updateTodo: makeUpdateTodo({ updateTodo }),
    deleteTodo: makeDeleteTodo({ deleteTodo }),
    deleteAllTodos: makeDeleteAllTodos({ deleteAllTodos }),
    updateAllTodos: makeUpdateAllTodos({ updateAllTodos }),
  };
}
