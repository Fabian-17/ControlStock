import { Router, Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.send('Hello World');
});

export default router;