import { Request, Response } from 'express';
import { Patient } from '../models/Patient';
import { Op } from 'sequelize';
import { PatientService } from '../services/patient-service';

export class PatientsController {

  public static async getPatients(req: Request, res: Response) {
    try {
      const patients = await PatientService.getPatients(req.query)
      res.status(200).json(patients);
    } catch (error) {
      console.error("Erro ao buscar pacientes", error);
      res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }

  }

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
  
  public static async getPatientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res.status(400).json({ error: 'Paciente não encontrado' });
      }
      return res.status(200).json(patient);
    } catch (error) {
      console.error('Erro ao buscar paciente por id:', error);
      return res.status(500).json({ error: 'Erro ao buscar paciente por id' });
    }
  }

}
