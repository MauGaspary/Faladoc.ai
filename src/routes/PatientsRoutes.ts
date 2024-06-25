import { Router } from 'express';
import { PatientsController } from '../controllers/PatientController';
const router = Router();

router.get('/patients', PatientsController.getPatients);
router.get('/patients/:id', PatientsController.getPatientById);
router.post('/patients', PatientsController.createPatient);

export default router;
