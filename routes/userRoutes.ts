import express from "express";
import { UserController } from "../controllers/userController";
import { validate } from "../middleware/validation";
import { createUserSchema } from "../schemas/userSchema";
import { authenticateToken } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Отримати список усіх користувачів
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список користувачів отримано
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Неавторизований
 *       403:
 *         description: Відсутність доступу
 */
router.get(
	"/",
	authenticateToken,
	authorize("admin", "manager"),
	UserController.getAllUsers,
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Отримати користувача за ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID користувача
 *     responses:
 *       200:
 *         description: Користувача знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Неавторизований
 *       403:
 *         description: Відсутність доступу
 *       404:
 *         description: Користувача не знайдено
 */
router.get(
	"/:id",
	authenticateToken,
	authorize("admin", "manager"),
	UserController.getUserById,
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Оновити дані користувача
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Користувача оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Некоректні дані
 *       401:
 *         description: Неавторизований
 *       403:
 *         description: Відсутність доступу
 *       404:
 *         description: Користувача не знайдено
 */
router.put(
	"/:id",
	authenticateToken,
	authorize("admin"),
	validate(createUserSchema),
	UserController.updateUser,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Видалити користувача
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID користувача
 *     responses:
 *       204:
 *         description: Користувача успішно видалено
 *       401:
 *         description: Неавторизований
 *       403:
 *         description: Відсутність доступу
 *       404:
 *         description: Користувача не знайдено
 */
router.delete(
	"/:id",
	authenticateToken,
	authorize("admin"),
	UserController.deleteUser,
);

export default router;
