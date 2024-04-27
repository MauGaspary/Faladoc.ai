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
  public static async createDoctor(req: Request, res: Response){
    try{
      const doctor = req.body;
      doctor.setType = "Doctor";
      const newDoctor = await Doctor.create(doctor);
      res.status(200).json(newDoctor);
    }
    catch(error){
      console.error("erro no create doctor", error);
      res.status(500).json({error:'erro'});
    }
    
  }
  
}
