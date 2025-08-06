import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "./statusCode";

interface AuthenticatedRequest extends Request {
	user?: {
		role?: string;
		[key: string]: any;
	};
}

export function authorize(...allowedRoles: string[]) {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const user = req.user;

		if (!user || typeof user !== "object" || !user.role) {
			return res
				.status(STATUS_CODES.UNAUTHORIZED)
				.json({ message: "Access denied" });
		}

		if (!allowedRoles.includes(user.role)) {
			return res
				.status(STATUS_CODES.FORBIDDEN)
				.json({ message: "You don't have permission to perform this action" });
		}

		next();
	};
}
