import { User, UserCreationAttrs } from "./user";
import { NotFoundError } from "./errors";
import bcrypt from "bcrypt";

export const UserService = {
	async getAll() {
		return User.findAll();
	},

	async getById(id: number) {
		const user = await User.findByPk(id);
		if (!user) throw new NotFoundError(`User with id ${id} not found`);
		return user;
	},

	async update(id: number, data: Partial<UserCreationAttrs>) {
		const user = await User.findByPk(id);
		if (!user) throw new NotFoundError(`User with id ${id} not found`);

		if (data.password) {
			data.password = await bcrypt.hash(data.password, 10);
		}

		return user.update(data);
	},

	async delete(id: number) {
		const user = await User.findByPk(id);
		if (!user) throw new NotFoundError(`User with id ${id} not found`);

		await user.destroy();
		return user;
	},
};
