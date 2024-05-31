
import { Appointment, buildAppointmentQuery, AppointmentQueryParams } from '../models/Appointment';
import { Patient } from '../models/Patient';


export class AppointmentService {
    static async getAppointments(query: AppointmentQueryParams) {
        const { whereCondition, patientCondition } = buildAppointmentQuery(query);

        const appointments = await Appointment.findAll({
            where: whereCondition,
            attributes: { exclude: ['medical_record_original', 'medical_record_final'] },
            include: [
                {
                    model: Patient,
                    where: patientCondition
                }
            ]
        });

        return appointments;
    }
}