import express from "express";
import userRouter from "./users.js";
import authRouter from "./auth.js";

const router = express.Router();

router.use("/api/users", userRouter);
router.use("/api/auth", authRouter);

export default router;
