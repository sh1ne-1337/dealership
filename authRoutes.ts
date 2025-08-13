import express from "express";
import { authController } from "./authController";

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - phone
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Max
 *               surname:
 *                 type: string
 *                 example: Payne
 *               email:
 *                 type: string
 *                 example: max@example.com
 *               phone:
 *                 type: string
 *                 example: "+380501234567"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Користувача зареєстровано
 *       400:
 *         description: Некоректні дані
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.post("/signup", authController.signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Вхід користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: maxt@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Успішний вхід та отримання токенів
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: max@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIs..."
 *       401:
 *         description: Невірні облікові дані
 */
router.post("/signin", authController.signIn);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Оновлення токена доступу
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Новий токен доступу
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIs..."
 *       401:
 *         description: Відсутній refresh токен
 *       500:
 *         description: Помилка при оновленні токена
 */
router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Вихід користувача
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Успішний вихід
 *       400:
 *         description: Відсутній refresh токен
 */
router.post("/logout", authController.logout);

export default router;
