import { Sequelize } from "sequelize";
import config from "./config/config";

const dbConfig = config.development;

if (
	!dbConfig.database ||
	!dbConfig.username ||
	!dbConfig.password ||
	!dbConfig.host ||
	!dbConfig.port
) {
	throw new Error("Missing database configuration");
}

export const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: Number(dbConfig.port),
		dialect: dbConfig.dialect,
		logging: false,
	},
);
