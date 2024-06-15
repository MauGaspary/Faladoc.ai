import { Router } from 'express';
import { PatientsController } from '../controllers/PatientController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/patients/:name', loginRequired, PatientsController.getPatientsByName);
router.post('/patients', loginRequired, PatientsController.createPatient);
router.get('/patients/id/:id', loginRequired, PatientsController.getPatientById);

export default router;
