import { Router } from 'express';
import { AppointmentsController } from '../controllers/AppointmentsController';
const router = Router();

router.post('/appointments', AppointmentsController.createAppointment)
router.patch('/appointments/:id', AppointmentsController.updateAppointment)
router.get('/appointments', AppointmentsController.getAppointments);
router.get('/appointments/:id', AppointmentsController.getAppointmentById)
router.delete('/appointments/:id', AppointmentsController.deleteAppointment);

export default router;
