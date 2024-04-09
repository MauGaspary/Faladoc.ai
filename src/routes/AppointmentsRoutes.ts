import { Router } from 'express';
import { AppointmentsController } from '../controllers/AppointmentsController';
const router = Router();

router.post('/appointments', AppointmentsController.createAppointment);

export default router;
