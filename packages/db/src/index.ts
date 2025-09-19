import { makeTodoCrudApi } from "@clean-todo/bl";
import { inMemoryCrudApi } from "./inMemory";
import { inMongo } from "./inMongo";
import { inSystemCrudApi } from "./inSystem";

const crudApi = makeTodoCrudApi(inMongo);

export { crudApi };
