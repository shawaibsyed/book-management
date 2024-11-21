import { Request, Response, NextFunction } from 'express';

export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    res
      .status(400)
      .json({ error: 'Invalid ID parameter. Must be a positive integer.' });
    return;
  }

  next();
}
