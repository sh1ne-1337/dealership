import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { STATUS_CODES } from "./statusCode";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("Missing SECRET in environment variables");

interface JwtUserPayload extends JwtPayload {
	id: number;
	role: string;
	email: string;
}

interface AuthenticatedRequest extends Request {
	user?: JwtUserPayload;
}

export function authenticateToken(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		return res
			.status(STATUS_CODES.UNAUTHORIZED)
			.json({ message: "No token provided" });

	try {
		const decoded = jwt.verify(token, SECRET as string) as JwtUserPayload;
		req.user = decoded;
		next();
	} catch (err) {
		return res
			.status(STATUS_CODES.FORBIDDEN)
			.json({ message: "Invalid or expired token" });
	}
}
