import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Documentation",
			version: "1.0.0",
			description: "A simple Express API with TypeScript",
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Development server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./userRoutes.ts", "./authRoutes.ts"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
	console.log("Swagger UI available at http://localhost:3000/api-docs");
};

export default specs;
