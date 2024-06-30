import { Patient, buildPatientQueryParams, PatientQueryParams } from '../models/Patient';

export class PatientService {
    static async getPatients(query: PatientQueryParams) {
        const whereCondition = buildPatientQueryParams(query);
        
        const patients = await Patient.findAll({
            where: whereCondition,
            attributes: { 
                include: ['id', 'name', 'date_of_birth', 'cpf']
            },
        });

        return patients;
        
    }

    static async deletePatient(id: string) {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            throw new Error('Paciente não encontrado');
        }
        await patient.destroy();
    }
}