import { Request, Response } from 'express';
import { Patient } from '../models/Patient';
import { Op } from 'sequelize';

export class PatientsController {

  public static async getPatientsByName(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const patients = await Patient.findAll({
        where: {
          name: {[Op.iLike]: `${name}%`}
        },
        attributes: ['name', 'date_of_birth', 'cpf']
      });
      return res.status(200).json(patients);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      return res.status(500).json({ error: 'Erro ao buscar pacientes' });
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
