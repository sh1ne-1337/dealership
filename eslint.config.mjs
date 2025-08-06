import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			semi: ["error", "always"],
			quotes: ["error", "single"],
		},
	},
];
