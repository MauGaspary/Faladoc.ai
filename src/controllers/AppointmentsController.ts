
import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';

export class AppointmentsController {
  public static async createAppointment(req: Request, res: Response) {
    try {
        // Você precisa pegar os dados do corpo da requisição
        const appointment = req.body;
        const newAppointment = await Appointment.create(appointment);
        res.json(newAppointment);
    } catch (error) {
      console.error("Não consegui zé, malz. Ó o erro ai:", error);
      res.status(500).json({ error: 'Deu ruim' });
    }
  }
}
