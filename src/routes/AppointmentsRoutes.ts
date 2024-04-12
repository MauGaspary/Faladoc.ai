import { Router } from 'express';
import { AppointmentsController } from '../controllers/AppointmentsController';
const router = Router();

router.post('/appointments', AppointmentsController.createAppointment);
router.get('/appointments', AppointmentsController.getAppointments);

export default router;
