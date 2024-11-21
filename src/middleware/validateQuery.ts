import { Request, Response, NextFunction } from 'express';

export function validateQuery(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { page, limit } = req.query;

  if (page && (!/^\d+$/.test(page as string) || Number(page) <= 0)) {
    res
      .status(400)
      .json({ error: 'Invalid page parameter. Must be a positive integer.' });
    return;
  }

  if (limit && (!/^\d+$/.test(limit as string) || Number(limit) <= 0)) {
    res
      .status(400)
      .json({ error: 'Invalid limit parameter. Must be a positive integer.' });
    return;
  }

  next();
}
