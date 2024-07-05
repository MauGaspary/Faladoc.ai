import { Router } from "express";
import { UserController } from "../controllers/UserController";
//ort loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post('/users', UserController.createLoginUser);
router.get('/users', UserController.getUser);
router.patch('/users/:token', UserController.passwordReset);

export default router;