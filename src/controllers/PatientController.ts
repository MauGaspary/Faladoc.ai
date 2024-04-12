import { Request, Response } from 'express';
import { Patient } from '../models/Patient';

export class PatientController{

    public static async getPatientsByName(req : Request, res : Response){
    
        try{
            const { name } = req.body
            const patients = await Patient.findAll({
              where: {
                name: name
              },
              attributes: ['name', 'date_of_birth', 'cpf']
        });
            return res.status(200).json(patients);
        }catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            return res.status(500).json({ error: 'Erro ao buscar pacientes' });
        } 
    }
}
