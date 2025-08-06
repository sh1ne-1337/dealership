import express from "express";
import { signup, signin, refresh, logout } from "./authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
