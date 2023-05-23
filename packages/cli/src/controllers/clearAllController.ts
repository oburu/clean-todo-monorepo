import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { sleep } from '../utils/shared';
import { ICrudTodoApiBoundary } from '../../../../domain/boundaries/ICrudTodoApiBoundary';

export async function clearAllController(deleteAllTodos: ICrudTodoApiBoundary['deleteAllTodos']) {
  console.clear();

  const question = await inquirer.prompt({
    name: 'response',
    type: 'input',
    message: `Are you ${chalk.green('SURE')} you want to ${chalk.red(
      'DELETE ALL TODOS!?'
    )}${chalk.gray('(yes/y)')}:`,
  });

  if (question.response === 'yes' || question.response === 'y') {
    const spinner = createSpinner('deleting...');
    spinner.start();

    await sleep(500);
    await deleteAllTodos();

    spinner.success({ text: chalk.green('ALL TODOS Deleted!') });
    spinner.stop;
  }
  console.log(chalk.blue('Ok, no problem 👍 \n'));
  return;
}
