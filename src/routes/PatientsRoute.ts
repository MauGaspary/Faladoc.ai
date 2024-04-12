import { Router } from 'express';
import { PatientController } from '../controllers/PatientController';
const router = Router();

router.get('/patients', PatientController.getPatientsByName);

export default router;
