import { Router } from "express";
import { PasswordResetController } from "../controllers/PasswordResetController";
const router = Router();

router.post('/passwordReset',  PasswordResetController.createPasswordReset);

export default router;