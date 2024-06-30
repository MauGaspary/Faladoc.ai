import { Router } from 'express';
import { PatientsController } from '../controllers/PatientController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/patients', loginRequired, PatientsController.getPatients);
router.get('/patients/:id', loginRequired, PatientsController.getPatientById);
router.get('/patients/doctor/:doctorId', PatientsController.getPatientsByDoctorId);
router.get('/patients?name=', loginRequired, PatientsController.getPatientsByName);
router.post('/patients', loginRequired, PatientsController.createPatient);

export default router;