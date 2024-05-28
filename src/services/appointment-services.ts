import { Op } from 'sequelize';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';

interface QueryParams {
    patient_name?: string;
    patient_id?: string;
    appointment_date?: string;
    hospital?: string;
    appointment_status?: string;
}

export class AppointmentService {
    static async getAppointments(query: QueryParams) {
        const { patient_name, patient_id, appointment_date, hospital, appointment_status } = query;

        let whereCondition: { [key: string]: any } = {};
        if (patient_id) {
            whereCondition['patient_id'] = {
                [Op.eq]: patient_id
            };
        }

        if (appointment_date) {
            whereCondition['appointment_date'] = {
                [Op.eq]: new Date(appointment_date)
            };
        }
        if (hospital) {
            whereCondition['hospital'] = {
                [Op.like]: `%${hospital}%`
            };
        }

        if (appointment_status) {
            whereCondition['appointment_status'] = {
                [Op.eq]: appointment_status
            };
        }

        const appointments = await Appointment.findAll({
            where: whereCondition,
            include: [
                {
                    model: Patient,
                    where: {
                        name: {
                            [Op.eq]: `%${patient_name}%`
                        }
                    }
                }
            ]
        });
    }
}
