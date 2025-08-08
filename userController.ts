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

	async update(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const updatedUser = await UserService.update(id, req.body);
			res.status(STATUS_CODES.OK).json(updatedUser);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			res.status(STATUS_CODES.BAD_REQUEST).json({ message: errorMessage });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const deletedUser = await UserService.delete(id);
			res
				.status(STATUS_CODES.OK)
				.json({ message: "User deleted", user: deletedUser });
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			res.status(STATUS_CODES.BAD_REQUEST).json({ message: errorMessage });
		}
	},
};
