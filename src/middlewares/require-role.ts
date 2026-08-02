import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Role-based authorization middleware.
 * Reads the x-user-role header injected by the API Gateway after JWT verification.
 * Returns 403 if the caller's role is not in the allowed list.
 *
 * Usage:  router.post('/', requireRole('admin', 'flight_company'), createFlight);
 */
export const requireRole = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.headers['x-user-role'] as string | undefined;

        if (!userRole) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized: User role header missing. Ensure request is routed through the API Gateway.',
                data: {},
                error: { explanation: 'x-user-role header not present' }
            });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: `Forbidden: Role '${userRole}' is not allowed to perform this action. Required: [${allowedRoles.join(', ')}]`,
                data: {},
                error: { explanation: 'Insufficient permissions' }
            });
        }

        return next();
    };
};
