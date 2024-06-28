import { Router } from "express";
import { UserController } from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post('/users', loginRequired, UserController.createLoginUser);
router.get('/users', loginRequired, UserController.getUser);
router.patch('/users/:token', loginRequired, UserController.passwordReset);

export default router;