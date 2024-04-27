import { Router } from 'express';
import { DoctorController } from '../controllers/DoctorController';

const router = Router();

router.get('/doctors', DoctorController.getAllDoctors);
router.post('/doctors', DoctorController.createDoctor);

export default router;
