const { StatusCodes } = require('http-status-codes');

/**
 * Express middleware to validate request payload against a Zod schema
 * @param {import('zod').ZodSchema} schema 
 */
const validateSchema = (schema) => async (req, res, next) => {
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
        if (error.errors) {
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
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Validation failed',
            data: {},
            error: error.message || error
        });
    }
};

module.exports = validateSchema;
