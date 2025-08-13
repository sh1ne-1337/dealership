import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { STATUS_CODES } from "../config/statusCode";

export const validate =
	(schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			return res.status(STATUS_CODES.BAD_REQUEST).json({
				message: "Validation failed",
				errors: result.error.issues,
			});
		}
		next();
	};
