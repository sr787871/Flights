import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validateSchema = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            if (parsed.body) req.body = parsed.body;
            if (parsed.query) req.query = parsed.query;
            if (parsed.params) req.params = parsed.params;
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: 'Invalid request data',
                    data: {},
                    error: {
                        details: error.errors.map(err => ({
                            field: err.path.join('.').replace(/^(body|query|params)\./, ''),
                            message: err.message
                        }))
                    }
                });
            }
            return next(error);
        }
    };
};
