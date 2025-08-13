import { STATUS_CODES } from "../config/statusCode";

export class NotFoundError extends Error {
	status: number;

	constructor(message: string = "Resource not found") {
		super(message);
		this.name = "NotFoundError";
		this.status = STATUS_CODES.NOT_FOUND;

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}
