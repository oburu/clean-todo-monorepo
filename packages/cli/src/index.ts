#!/usr/bin/env node
import { displayChoices, welcome } from "./utils/views";

async function startApp() {
  await welcome();
  await displayChoices();
}

startApp();
