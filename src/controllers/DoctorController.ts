import { Request, Response } from 'express';
import { Doctor } from '../models/Doctor';
import { UserService } from '../services/user-services';

export class DoctorController {
  public static async getAllDoctors(req: Request, res: Response) {
    try {
      const doctors = await Doctor.findAll();
      res.json(doctors);
    } catch (error) {
      console.error("Não consegui zé, malz. Ó o erro ai:", error);
      res.status(500).json({ error: 'Deu ruim' });
    }
  }

  public static async createDoctor(req: Request, res: Response) {
    try {
      const { name, crm, hospital, email, password, specialty } = req.body;
      const user = await UserService.createLoginUser(email, password, 'DOCTOR');
      if (user) {
        const doctor = await Doctor.create({
          user_id: user.id,
          name,
          crm,
          hospital: hospital || null,
          specialty: specialty || null
        });
        res.status(200).json(doctor);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating doctor" });
    }
  }
  
}
