import express from "express";
import { UserController } from "./userController";
import { validate } from "./validation";
import { createUserSchema } from "./userSchema";
import { authenticateToken } from "./auth";
import { authorize } from "./authorize";

const router = express.Router();

router.get(
	"/",
	authenticateToken,
	authorize("admin", "manager"),
	UserController.getAllUsers,
);
router.get(
	"/:id",
	authenticateToken,
	authorize("admin", "manager"),
	UserController.getUserById,
);
router.put(
	"/:id",
	authenticateToken,
	authorize("admin"),
	validate(createUserSchema),
	UserController.updateUser,
);
router.delete(
	"/:id",
	authenticateToken,
	authorize("admin"),
	UserController.deleteUser,
);

export default router;
