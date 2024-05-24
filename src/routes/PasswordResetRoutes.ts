import { Router } from "express";
import { PasswordResetController } from "../controllers/PasswordResetController";
const router = Router();

router.post('/passwordReset',  PasswordResetController.createPasswordReset);
router.get('/passwordReset/:token', PasswordResetController.getPasswordReset);

export default router;
