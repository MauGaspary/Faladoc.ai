
import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';

export class AppointmentsController {
  public static async createAppointment(req: Request, res: Response) {
    try {
        const appointment = req.body;
        appointment.appointment_status = 'PROCESSING';
        const newAppointment = await Appointment.create(appointment);
        res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Erro ao criar consulta", error);
      res.status(500).json({ error: 'Erro ao criar consulta' });
    }
  }
}
