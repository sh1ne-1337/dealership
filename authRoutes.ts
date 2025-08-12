import express from "express";
import { signUp, signIn, refresh, logout } from "./authController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
