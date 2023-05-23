import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { ICrudTodoApiBoundary } from '../../../../domain/boundaries/ICrudTodoApiBoundary';
import { shortId, sleep } from '../utils/shared';

export async function deleteTodoController({
  deleteTodo,
  getAllTodos,
}: Pick<ICrudTodoApiBoundary, 'deleteTodo' | 'getAllTodos'>) {
  console.clear();

  const typedTodo = await inquirer.prompt({
    name: 'id',
    type: 'input',
    message: `Please, type the index of the todo to delete${chalk.gray('(enter to go back)')}:`,
  });

  if (typedTodo.id === '') {
    return;
  }
  const spinner = createSpinner('deleting...').start();
  const todoList = await getAllTodos();
  const todo = todoList.find((todo) => shortId(todo.id) === typedTodo.id);

  await sleep(500);

  if (!todo?.id) {
    spinner.error({ text: chalk.red('Todo does not exists') });
    spinner.stop;
    return;
  }

  await deleteTodo(todo.id);

  spinner.success({ text: `Todo ${todo.description} ${chalk.red('Deleted!')}` });
  spinner.stop;
}
