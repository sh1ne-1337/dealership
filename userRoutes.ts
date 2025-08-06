import express from "express";
import { UserController } from "./userController";
import { validate } from "./validation";
import { createUserSchema } from "./userSchema";
import { authenticateToken } from "./auth";
import { authorize } from "./authorize";

const router = express.Router();

router.get("/", authenticateToken, authorize("admin"), UserController.getAll);
router.get(
	"/:id",
	authenticateToken,
	authorize("admin"),
	UserController.getById,
);
router.put(
	"/:id",
	authenticateToken,
	authorize("admin"),
	validate(createUserSchema),
	UserController.update,
);
router.delete(
	"/:id",
	authenticateToken,
	authorize("admin"),
	UserController.delete,
);

export default router;
