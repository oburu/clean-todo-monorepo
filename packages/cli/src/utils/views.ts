import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { choices } from "../constants";
import { handleSelectedChoice } from "../handleSelectedChoice";
import { sleep } from "./shared";

export async function welcome() {
  await createRainBowAnimation("Welcome to the CLI todo list");
  console.log(`
  ${chalk.bgBlue("HOW TO USE IT")}
  It's simple, just choose one of the ${chalk.bgMagenta("options")} below
  `);
  await sleep();
}

export async function goodBye() {
  await createRainBowAnimation("Thank you, bye bye!! 👋👋");
  process.exit(0);
}

export async function displayChoices() {
  const answer = await inquirer.prompt({
    name: "choice",
    type: "list",
    message: "What do you want to do? \n",
    choices: Object.values(choices),
  });
  await handleSelectedChoice(answer.choice);
  await displayChoices();
}

async function createRainBowAnimation(text: string) {
  console.clear();
  const rainbowTitle = chalkAnimation.rainbow(text);
  await sleep(1000);
  rainbowTitle.stop();
}
