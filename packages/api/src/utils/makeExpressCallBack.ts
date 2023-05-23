import { Request, Response, NextFunction } from 'express';
import { makeCustomResponse } from './makeCustomResponse';

export function makeExpressCallBack(controller: (req: Request) => Promise<object>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const content = await controller(req);

      res.json(makeCustomResponse({ status: true, content }));

      next();
    } catch (err) {
      next(err);
    }
  };
}
