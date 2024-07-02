import { Request, Response } from 'express';
import { Patient } from '../models/Patient';
import { PatientService } from '../services/patient-service';

export class PatientsController {

  public static async getPatients(req: Request, res: Response) {
    try {
      const patients = await PatientService.getPatients(req.query)
      res.status(200).json(patients);
    } catch (error) {
      console.error("Erro ao buscar pacientes", error);
      res.status(500).json({ error: 'Erro ao buscar pacientes'});
    }
  }

  public static async getPatientsByName(req: Request, res: Response) {
    try {
      const name = req.query.name.toString();
      const patients = await PatientService.getPatientsByName(name);
      res.status(200).json(patients);
    } catch (error) {
      console.error("Erro ao buscar pacientes", error);
      res.status(500).json({ error: 'Erro ao buscar pacientes' });
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

  public static async getPatientsByDoctorId(req: Request, res: Response) {
    try {
      const { doctorId } = req.params;
      const patients = await PatientService.getPatientsByDoctorId(doctorId);
      res.status(200).json(patients);
    } catch (error) {
      console.error("Erro ao buscar pacientes por id do médico", error);
      res.status(500).json({ error: 'Erro ao buscar pacientes por id do médico' });
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

}
