import {
	Model,
	DataTypes,
	InferCreationAttributes,
	CreationOptional,
} from "sequelize";
import { sequelize } from "./db";

export class User extends Model {
	public id!: CreationOptional<number>;
	public name!: string;
	public surname!: string;
	public email!: string;
	public phone!: string;
	public password!: string;
	public role!: "customer" | "admin" | "manager";
}
export type UserCreationAttrs = Omit<InferCreationAttributes<User>, "id">;

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		phone: {
			type: DataTypes.STRING(13),
			allowNull: false,
			unique: true,
			validate: {
				is: /^\+?[0-9]{10,13}$/,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM("customer", "admin", "manager"),
			allowNull: false,
			defaultValue: "customer",
		},
	},
	{
		sequelize,
		tableName: "users",
		schema: "cardealership",
		timestamps: false,
	},
);
