import { Router } from 'express';
import { PatientsController } from '../controllers/PatientController';
const router = Router();

router.get('/patients/:name', PatientsController.getPatientsByName);
router.get('/patients/:id', PatientsController.getPatientById);
router.post('/patients', PatientsController.createPatient);

export default router;
