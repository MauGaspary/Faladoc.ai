<<<<<<< HEAD
import { Router } from 'express';
import { PasswordResetController } from '../controllers/PasswordResetController';
const router = Router();

router.get('/passwordReset/:token', PasswordResetController.getPasswordReset);

export default router;
=======
import { Router } from "express";
import { PasswordResetController } from "../controllers/PasswordResetController";
const router = Router();

router.post('/passwordReset',  PasswordResetController.createPasswordReset);

export default router;
>>>>>>> fee513781c85f56a38cc16451d9de1f1386e9cd5
