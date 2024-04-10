
import { Request, Response } from 'express';
import { Patient } from '../models/Patient';

export class PatientsController {
  public static async createPatient(req: Request, res: Response) {
    try {
        const patient = req.body;
        const newPatient = await Patient.create(patient);
        res.status(201).json(newPatient);
    } catch (error) {
      console.error("Erro ao criar paciente", error);
      res.status(500).json({ error: 'Erro ao criar paciente' });
    }
  }
}