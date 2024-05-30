import { Router } from 'express';
import { PatientsController } from '../controllers/PatientController';
const router = Router();

router.get('/patients/:name', PatientsController.getPatientsByName);
router.post('/patients', PatientsController.createPatient);
router.get('/patients/:id', PatientsController.getPatientById);

export default router;
