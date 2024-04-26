import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.delete('/logout', AuthController.logout);

export default router;
