import chalk from 'chalk';
import { ICrudTodoApiBoundary } from '@clean-todo/business';
import { formatTable } from '../utils/formatTableRow';

export async function listTodosController(getAllTodos: ICrudTodoApiBoundary['getAllTodos']) {
  const table = await getAllTodos();
  if (!table.length) {
    console.log(chalk.magenta('It seems the todo list is empty 🤔...'));
  }

  console.table(formatTable(table));
}
