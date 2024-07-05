import { Router } from 'express';
import { PatientsController } from '../controllers/PatientController';
// import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/patients', PatientsController.getPatients);
router.get('/patients/:id', PatientsController.getPatientById);
router.get('/patients/doctor/:doctorId', PatientsController.getPatientsByDoctorId);
router.post('/patients', PatientsController.createPatient);

export default router; 