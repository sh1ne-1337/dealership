import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "./user";

dotenv.config();
const SECRET = process.env.SECRET!;

export const authService = {
	createUser: async (data: Omit<User, "id">) => {
		const hashedPassword = await bcrypt.hash(data.password, 10);

		const user = await User.create({
			name: data.name,
			surname: data.surname,
			email: data.email,
			phone: data.phone,
			password: hashedPassword,
			role: data.role,
		});

		return user;
	},

	validateUser: async (email: string, password: string) => {
		const user = await User.findOne({ where: { email } });

		if (!user) return null;

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return null;

		return user;
	},

	generateTokens: (user: Pick<User, "id" | "email" | "role">) => {
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

		return { accessToken, refreshToken };
	},

	verifyRefreshToken: (token: string) => {
		return jwt.verify(token, SECRET) as Pick<User, "id" | "email" | "role">;
	},
};
