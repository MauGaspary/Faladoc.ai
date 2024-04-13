
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

  public static async updateAppointment (req: Request, res: Response){
    try{
      const {id} = req.params;
      const appointment = req.body;
      const linesChanged = await Appointment.update(appointment, { where: {id}});
      const updateAppointment = await Appointment.findOne({ where: {id}});
      res.status(200).json(updateAppointment);
    } catch (error){
      console.log("Erro ao atualizar consulta", error);
      res.status(500).json({ error: 'Erro ao atualizar consulta'});
    }
  }
}
