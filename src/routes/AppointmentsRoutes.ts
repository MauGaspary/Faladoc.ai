import { Router } from 'express';
import { AppointmentsController } from '../controllers/AppointmentsController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.post('/appointments', loginRequired, AppointmentsController.createAppointment)
router.patch('/appointments/:id', loginRequired, AppointmentsController.updateAppointment)
router.get('/appointments', loginRequired, AppointmentsController.getAppointments);

export default router;
