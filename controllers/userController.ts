import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { STATUS_CODES } from "../config/statusCode";
import { handleError } from "../utils/handleError";

export const UserController = {
	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserService.getAllUsers();
			res.status(STATUS_CODES.OK).json(users);
		} catch (error) {
			handleError(error, res);
		}
	},

	async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const user = await UserService.getUserById(Number(req.params.id));
			res.status(STATUS_CODES.OK).json(user);
		} catch (error) {
			handleError(error, res);
		}
	},

	async updateUser(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const updatedUser = await UserService.updateUser(id, req.body);
			res.status(STATUS_CODES.OK).json(updatedUser);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			res.status(STATUS_CODES.BAD_REQUEST).json({ message: errorMessage });
		}
	},

	async deleteUser(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const deletedUser = await UserService.deleteUser(id);
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
