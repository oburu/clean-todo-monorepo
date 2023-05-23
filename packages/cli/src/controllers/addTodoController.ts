import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { ICrudTodoApiBoundary, makeTodo, makeId } from '@clean-todo/business';
import { sleep } from '../utils/shared';

export async function addTodoController(createTodo: ICrudTodoApiBoundary['createTodo']) {
  console.clear();

  const { description } = await inquirer.prompt({
    name: 'description',
    type: 'input',
    message: 'Add todo:',
  });

  const spinner = createSpinner('adding...').start();
  const todo = makeTodo(makeId).please({ description });
  console.log(todo);

  await createTodo(todo);
  await sleep(500);

  spinner.success({ text: `Todo ${chalk.bgBlue(description)} saved!` });
  spinner.stop;
}
