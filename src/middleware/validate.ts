import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateBody(type: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const errors: ValidationError[] = await validate(
      plainToClass(type, req.body),
    );

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      console.error('Validation Errors:', errorMessages); // Log validation errors
      res.status(400).json({ errors: errorMessages });
      return;
    }

    next();
  };
}
