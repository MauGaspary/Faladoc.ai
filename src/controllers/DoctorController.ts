import { Request, Response } from 'express';
import { Doctor } from '../models/Doctor';

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
}
