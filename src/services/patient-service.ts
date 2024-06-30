import { Op } from 'sequelize';
import { Patient, buildPatientQueryParams, PatientQueryParams } from '../models/Patient';
import { Appointment } from '../models/Appointment';

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

    static async getPatientsByName(name: string) {
        const patients = await Patient.findAll({
            where: { name: { [Op.like]: `%${name}%` } },
            attributes: ['id', 'name', 'date_of_birth', 'cpf']
        });

        return patients;

    }

    static async getPatientsByDoctorId(doctorId: string) {
        const Appointments = await Appointment.findAll({
            where: { doctor_id: doctorId },
            attributes: ['patient_id'],
        });
        console.log('Appointments', Appointments);

        const patientsId = Appointments.map((appointment) => appointment.patient_id);

        const patients = await Patient.findAll({
            where: { id: { [Op.in]: patientsId } },
            attributes: ['id', 'name', 'date_of_birth', 'cpf'],
        });

        console.log('patientsSERVICE', patients);

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