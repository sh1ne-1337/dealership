import { Request, Response } from "express";
import { authService } from "./authService";
import { STATUS_CODES } from "./statusCode";
import { handleError } from "./handleError";

export const authController = {
	async signUp(req: Request, res: Response): Promise<void> {
		try {
			const user = await authService.createUser(req.body);

			if (!user) {
				res
					.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
					.json({ error: "Failed to create user" });
				return;
			}

			res.status(STATUS_CODES.CREATED).json(user);
		} catch (error) {
			handleError(error, res);
		}
	},

	async signIn(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const user = await authService.validateUser(email, password);

			if (!user) {
				res
					.status(STATUS_CODES.UNAUTHORIZED)
					.json({ message: "Invalid email or password" });
				return;
			}

			const { accessToken, refreshToken } = authService.generateTokens({
				id: user.id,
				email: user.email,
				role: user.role,
			});

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			res.status(STATUS_CODES.OK).json({
				message: "Success",
				user: { id: user.id, email: user.email, role: user.role },
				accessToken,
			});
		} catch (error) {
			handleError(error, res);
		}
	},

	async refresh(req: Request, res: Response): Promise<void> {
		const token = req.cookies?.refreshToken;

		if (!token) {
			res
				.status(STATUS_CODES.UNAUTHORIZED)
				.json({ message: "No refresh token provided" });
			return;
		}

		try {
			const decoded = authService.verifyRefreshToken(token);
			const accessToken = authService.generateTokens(decoded).accessToken;

			res.status(STATUS_CODES.OK).json({ accessToken });
		} catch (error) {
			handleError(error, res);
		}
	},

	async logout(req: Request, res: Response): Promise<void> {
		const token = req.cookies?.refreshToken;

		if (!token) {
			res
				.status(STATUS_CODES.BAD_REQUEST)
				.json({ message: "No refresh token provided" });
			return;
		}

		try {
			res.clearCookie("refreshToken", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			});

			res.status(STATUS_CODES.OK).json({ message: "Logged out successfully" });
		} catch (error) {
			handleError(error, res);
		}
	},
};
