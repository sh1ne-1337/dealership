import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { sequelize } from "./db";
import chalk from "chalk";
import logger from "./logger";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
	morgan("combined", {
		stream: {
			write: (message) => logger.http(message.trim()),
		},
	}),
);

(async () => {
	try {
		await sequelize.authenticate();
		logger.info("Connected to PostgreSQL database");

		await sequelize.query("CREATE SCHEMA IF NOT EXISTS cardealership;");
		logger.info("Schema 'cardealership' ensured");

		await sequelize.sync();
		logger.info("Database synced");

		app.use("/", routes);

		app.listen(process.env.PORT, () => {
			logger.info(
				chalk.bgMagenta(
					`Server started successfully on port ${process.env.PORT}`,
				),
			);
		});
	} catch (err) {
		logger.error("Error connecting:", err);
		process.exit(1);
	}
})();
