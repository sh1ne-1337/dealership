import { DataTypes } from "sequelize";

export default {
	up: async (queryInterface) => {
		await queryInterface.createSchema("cardealership");

		await queryInterface.createTable(
			{
				schema: "cardealership",
				tableName: "users",
			},
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
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
				},
				phone: {
					type: DataTypes.STRING(13),
					allowNull: false,
					unique: true,
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
		);
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable({
			schema: "cardealership",
			tableName: "users",
		});
	},
};
