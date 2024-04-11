import { Request, Response } from 'express';
import { Patient } from '../models/Patient';

export class PatientController{

    public static async getPatients(req, res){
    
        try{
            const { name } = req.query;
            const patients = await Patient.findAll({
              where: {
                name: name
              },
              attributes: ['name', 'Date_of_birth', 'cpf']
            });
            return res.status(200).json(patients);
        }catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            return res.status(500).json({ error: 'Erro ao buscar pacientes' });
        } 
    }
}
