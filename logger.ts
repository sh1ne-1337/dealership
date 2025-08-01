import { createLogger, format, transports } from "winston";
import { TransformableInfo } from "logform";
import winston from "winston";

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "blue",
};

winston.addColors(colors);
const logger = createLogger({
	levels,
	level: "http",
	format: format.combine(
		format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		format.printf((info) => {
			const { timestamp, level, message } = info as TransformableInfo & {
				timestamp: string;
			};
			return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
		}),
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({ all: true }),
				format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				format.printf((info) => {
					const { timestamp, level, message } = info as TransformableInfo & {
						timestamp: string;
					};
					return `[${timestamp}] ${level}: ${message}`;
				}),
			),
		}),
		new transports.File({ filename: "logs/error.log", level: "error" }),
		new transports.File({ filename: "logs/combined.log" }),
	],
});

export default logger;
