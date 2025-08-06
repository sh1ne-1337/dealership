import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(2),
	surname: z.string().min(2),
	email: z.email(),
	password: z.string().min(6),
	phone: z.string().regex(/^\+?\d{10,13}$/),
	role: z.enum(["customer", "admin", "manager"]),
});
