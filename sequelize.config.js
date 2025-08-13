/* global process, module */
/** @type {import('sequelize').Options} */
const config = {
	development: {
		username: process.env.DB_USER || "postgres",
		password: process.env.DB_PASSWORD || "611611",
		database: process.env.DATABASE || "postgresTS",
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || 5432,
		dialect: "postgres",
		schema: "cardealership",
	},
};

module.exports = config;
