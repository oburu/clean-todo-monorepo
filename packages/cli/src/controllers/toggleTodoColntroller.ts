import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { ICrudTodoApiBoundary } from '@clean-todo/business';
import type { Todo } from '@clean-todo/business';
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

  // have to do this is because mongooseModel.findOne returns the model itself,
  let parsedTodo = todo;
  if ('_doc' in todo) {
    parsedTodo = todo._doc as Todo;
  }

  await updateTodo({ ...parsedTodo, done: !todo.done });

  spinner.success({ text: `Todo ${chalk.blue(parsedTodo.description)} toggled!` });
  spinner.stop;
}
