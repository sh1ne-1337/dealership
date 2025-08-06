import { Request, Response } from "express";
import { UserService } from "./userService";
import { STATUS_CODES } from "./statusCode";
import { handleError } from "./handleError";

export const UserController = {
	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserService.getAll();
			res.status(STATUS_CODES.OK).json(users);
		} catch (error) {
			handleError(error, res);
		}
	},

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const user = await UserService.getById(Number(req.params.id));
			res.status(STATUS_CODES.OK).json(user);
		} catch (error) {
			handleError(error, res);
		}
	},

	async update(req: Request, res: Response): Promise<void> {
		try {
			const updated = await UserService.update(Number(req.params.id), req.body);
			res.status(STATUS_CODES.OK).json(updated);
		} catch (error) {
			handleError(error, res);
		}
	},

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const deleted = await UserService.delete(Number(req.params.id));
			res.status(STATUS_CODES.OK).json({ message: "Deleted", user: deleted });
		} catch (error) {
			handleError(error, res);
		}
	},
};
