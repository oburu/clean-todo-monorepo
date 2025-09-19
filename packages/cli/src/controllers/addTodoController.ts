import { ICrudTodoApiBoundary, makeId, makeTodo } from "@clean-todo/bl";
import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { sleep } from "../utils/shared";

export async function addTodoController(
  createTodo: ICrudTodoApiBoundary["createTodo"]
) {
  console.clear();

  const { description } = await inquirer.prompt({
    name: "description",
    type: "input",
    message: "Add todo:",
  });

  const spinner = createSpinner("adding...").start();
  const todo = makeTodo(makeId).please({ description });
  console.log(todo);

  await createTodo(todo);
  await sleep(500);

  spinner.success({ text: `Todo ${chalk.bgBlue(description)} saved!` });
  spinner.stop;
}
