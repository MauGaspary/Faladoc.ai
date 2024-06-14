import { Router } from 'express';
import { DoctorController } from '../controllers/DoctorController';

const router = Router();

router.get('/doctors', DoctorController.getAllDoctors);
router.post('/doctors', DoctorController.createDoctor);
router.get('/doctorsCfm/:crm/:state', DoctorController.getDoctorCfmData);

export default router;
