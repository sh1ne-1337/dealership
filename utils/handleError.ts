import { Response } from "express";
import { STATUS_CODES } from "../config/statusCode";
import logger from "./logger";

interface ErrorWithStatus extends Error {
	status?: number;
}

export function handleError(error: unknown, res: Response): void {
	logger.error(error);

	if (error instanceof Error) {
		const err = error as ErrorWithStatus;
		const status = err.status || STATUS_CODES.INTERNAL_SERVER_ERROR;
		res.status(status).json({ message: err.message });
	} else {
		res
			.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
			.json({ message: "Unknown error" });
	}
}
