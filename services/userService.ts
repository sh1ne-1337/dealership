import { User, UserCreationAttrs } from "../models/user";
import { NotFoundError } from "../errors/errors";
import redis from "../db/redisClient";
import bcrypt from "bcrypt";

export const UserService = {
	async getAllUsers() {
		return User.findAll();
	},

	async getUserById(id: number) {
		const cacheKey = `user:${id}`;

		const cached = await redis.get(cacheKey);
		if (cached) return JSON.parse(cached);

		const user = await User.findByPk(id);
		if (!user) throw new NotFoundError(`User with id ${id} not found`);

		await redis.set(cacheKey, JSON.stringify(user), "EX", 3600);

		return user;
	},

	async updateUser(id: number, data: Partial<UserCreationAttrs>) {
		const user = await User.findByPk(id);
		if (!user) throw new NotFoundError(`User with id ${id} not found`);

		if (data.password) {
			data.password = await bcrypt.hash(data.password, 10);
		}

		const updatedUser = await user.update(data);

		await redis.del(`user:${id}`);

		return updatedUser;
	},

	async deleteUser(id: number) {
		const user = await User.findByPk(id);
		if (!user) throw new NotFoundError(`User with id ${id} not found`);

		await user.destroy();

		await redis.del(`user:${id}`);

		return user;
	},
};
