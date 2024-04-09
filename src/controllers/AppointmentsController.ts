
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
// CREATE TABLE appointments (
//     id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
//     doctor_id uuid NOT NULL,
//     patient_id uuid NOT NULL,
//     appointment_context TEXT,
//     medical_record_original TEXT,
//     medical_record_final TEXT,
//     appointment_date DATE NOT NULL,
//     duration integer NOT NULL,
//     hospital varchar(255),
//     appointment_status Status NOT NULL
//   );
  
//poastman request for appointment
// {
//   "doctor_id": "1",
//   "patient_id": "2",
//   "appointment_context": "consulta",
//   "medical_record_original": "teste",
//   "medical_record_final": "teste",
//   "appointment_date": "2021-09-01",
//   "duration": 30,
//   "hospital": "hospital",
//   "appointment_status": "PROCESSING"
// }