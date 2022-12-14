import { validationResult, ValidationChain } from 'express-validator'
import { NextFunction, Request, Response } from 'express';

class PostValidator {
    public static storeAndUpdate(validations: ValidationChain[]) {
        return async (request: Request, response: Response, next: NextFunction) => {
          await Promise.all(validations.map(validation => validation.run(request)));
      
          const errors = validationResult(request);
          if (errors.isEmpty()) {
            return next();
          }
      
          response.status(400).json({ errors: errors.array() });
        };
    }
}

export default PostValidator