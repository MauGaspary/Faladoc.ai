import { Router } from 'express';
import { PasswordResetController } from '../controllers/PasswordResetController';
const router = Router();

router.get('/passwordReset/:token', PasswordResetController.getPasswordReset);

export default router;
