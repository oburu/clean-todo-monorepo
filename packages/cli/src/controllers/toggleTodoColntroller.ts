import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { ICrudTodoApiBoundary } from '../../../../domain/boundaries/ICrudTodoApiBoundary';
import { shortId, sleep } from '../utils/shared';

export async function toggleTodoController({
  updateTodo,
  getAllTodos,
}: Pick<ICrudTodoApiBoundary, 'updateTodo' | 'getAllTodos'>) {
  console.clear();

  const typedTodo = await inquirer.prompt({
    name: 'id',
    type: 'input',
    message: `Please, type the index of the todo to toggle${chalk.gray('(enter to go back)')}:`,
  });

  if (typedTodo.id === '') {
    return;
  }
  const spinner = createSpinner('updating...').start();
  const todoList = await getAllTodos();
  const todo = todoList.find((todo) => shortId(todo.id) === typedTodo.id);

  await sleep(500);

  if (!todo) {
    spinner.error({ text: chalk.red('Todo does not exists') });
    spinner.stop;
    return;
  }
  const toggledTodo = { ...todo, done: !todo.done };

  await updateTodo(toggledTodo);

  spinner.success({ text: `Todo ${chalk.blue(toggledTodo.description)} toggled!` });
  spinner.stop;
}
