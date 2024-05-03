import { Router } from "express";
import { UserController } from "../controllers/UserController";
const router = Router();

router.post('/users', UserController.createLoginUser);
router.get('/users', UserController.getUser);

export default router;