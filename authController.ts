import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "./db";
import dotenv from "dotenv";
import { STATUS_CODES } from "./statusCode";

dotenv.config();

const SECRET = process.env.SECRET!;

interface User {
	id: number;
	name: string;
	surname: string;
	email: string;
	phone: string;
	password: string;
	role: string;
}

export const signup = async (req: Request, res: Response) => {
	const { name, surname, email, phone, password, role } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const users = await sequelize.query<User>(
			`INSERT INTO cardealership.users (name, surname, email, phone, password, role)
       VALUES (:name, :surname, :email, :phone, :password, :role)
       RETURNING *`,
			{
				replacements: {
					name,
					surname,
					email,
					phone,
					password: hashedPassword,
					role,
				},
				type: QueryTypes.SELECT,
			},
		);

		const user = users[0];

		if (!user)
			return res
				.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
				.json({ error: "Failed to create user" });

		res.status(STATUS_CODES.CREATED).json(user);
	} catch (err: any) {
		res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}
};

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const users = await sequelize.query<User>(
			"SELECT * FROM cardealership.users WHERE email = :email",
			{
				replacements: { email },
				type: QueryTypes.SELECT,
			},
		);

		if (!users) {
			return res
				.status(STATUS_CODES.UNAUTHORIZED)
				.json({ message: "Invalid email or password" });
		}

		const user = users[0];
		if (!user) {
			return res
				.status(STATUS_CODES.UNAUTHORIZED)
				.json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(STATUS_CODES.UNAUTHORIZED)
				.json({ message: "Invalid email or password" });
		}

		const accessToken = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			SECRET,
			{
				expiresIn: process.env
					.ACCESS_TOKEN_EXPIRATION as `${number}${"m" | "h" | "d" | "s"}`,
			},
		);

		const refreshToken = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			SECRET,
			{
				expiresIn: process.env
					.REFRESH_TOKEN_EXPIRATION as `${number}${"m" | "h" | "d" | "s"}`,
			},
		);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.status(STATUS_CODES.OK).json({
			message: "Success",
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
			},
			accessToken,
		});
	} catch (err: any) {
		res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}
};

export const refresh = async (req: Request, res: Response) => {
	const refreshToken = req.cookies?.refreshToken;
	if (!refreshToken)
		return res
			.status(STATUS_CODES.UNAUTHORIZED)
			.json({ message: "No refresh token provided" });

	try {
		const decoded = jwt.verify(refreshToken, SECRET) as {
			id: number;
			email: string;
			role: string;
		};
		const accessToken = jwt.sign(
			{ id: decoded.id, email: decoded.email, role: decoded.role },
			SECRET,
			{
				expiresIn: process.env
					.ACCESS_TOKEN_EXPIRATION as `${number}${"m" | "h" | "d" | "s"}`,
			},
		);

		res.json({ accessToken });
	} catch (err: any) {
		res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}
};

export const logout = async (req: Request, res: Response) => {
	const refreshToken = req.cookies?.refreshToken;
	if (!refreshToken)
		return res
			.status(STATUS_CODES.BAD_REQUEST)
			.json({ message: "No refresh token provided" });

	try {
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		res.json({ message: "Logged out successfully" });
	} catch (err: any) {
		res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}
};
