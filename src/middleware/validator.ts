import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import FormatResponse from '../lib/FormatResponse';

const validate =
  (validations: any[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const response = new FormatResponse(
      false,
      400,
      'Validation error',
      errors.array()
    );

    return res.status(response.statusCode).json(response);
  };

export default validate;
