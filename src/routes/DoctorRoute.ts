import { Router } from 'express';
import { DoctorController } from '../controllers/DoctorController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/doctors', loginRequired, DoctorController.getAllDoctors);
router.post('/doctors', DoctorController.createDoctor);
router.get('/doctorsCfm/:crm/:state', DoctorController.getDoctorCfmData);

export default router;
