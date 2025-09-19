import { NextFunction, Request, Response } from "express";
import { makeCustomResponse } from "./makeCustomResponse";

type ValidationError = {
  field: string;
  message: string;
};

type Err = {
  status: number;
  reason?: string;
  message?: string;
  validationErrors?: ValidationError[];
  msg?: string;
  stack?: string;
};

type ResponseError = {
  status: number;
  reason: string;
  message: string;
  validationErrors?: ValidationError[];
  url?: string;
  ip?: string;
};

function makeResponseError(responseError: ResponseError) {
  return { ...responseError };
}

export const errorHandler = (
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 404 for my own response
  if (err.message === "Todo does not exist") {
    err.status = 404;
  }

  const actualError: ResponseError = {
    status: err.status || 500,
    message: err.msg || err.message || "No message",
    reason: err.reason || err.stack || "Something failed",
    url: req.originalUrl,
    ip: req.ip,
    validationErrors: err.validationErrors,
  };

  const error = makeResponseError(actualError);

  res.status(error.status);
  res.json(makeCustomResponse({ status: false, error }));
};
