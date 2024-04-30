import { Router } from "express";
import { UserController } from "../controllers/UserController";
const router = Router();

router.post('/', UserController.createLoginUser);
router.patch('/passwordReset/:token', UserController.passwordReset);

export default router;