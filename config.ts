import dotenv from "dotenv";
dotenv.config();

interface Config {
	host: string | undefined;
	port: number;
	username: string | undefined;
	password: string | undefined;
	database: string | undefined;
	dialect: "postgres";
}

const config: { development: Config } = {
	development: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE,
		dialect: "postgres",
	},
};

export default config;
