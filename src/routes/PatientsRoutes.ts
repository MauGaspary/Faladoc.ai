import { Router } from 'express';
import { PatientsController } from '../controllers/PatientController';
const router = Router();

router.post('/patients', PatientsController.createPatient);

export default router;
