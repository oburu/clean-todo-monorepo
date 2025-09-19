import { Router } from "express";
import { makeExpressCallBack } from "./utils/makeExpressCallBack";
import {
  addTodoRouteController,
  deleteTodoRouteController,
  getAllRouteController,
  updateAllTodosController,
  updateTodoController,
} from "./utils/makeRoutesControllers";

export function routes() {
  const router = Router();

  router
    .route("/todo")
    .get(makeExpressCallBack(getAllRouteController))
    .post(makeExpressCallBack(addTodoRouteController))
    .patch(makeExpressCallBack(updateTodoController))
    .delete(makeExpressCallBack(deleteTodoRouteController));

  router.route("/todos").post(makeExpressCallBack(updateAllTodosController));

  return router;
}
