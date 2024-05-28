import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import { Patient } from './Patient'; 

export class Appointment extends Model {
  public id!: string;
  public doctor_id!: string;
  public patient_id!: string;
  public appointment_context!: string;
  public medical_record_original!: string;
  public medical_record_final!: string;
  public appointment_date!: Date;
  public duration!: number;
  public hospital!: string;
  public appointment_status!: string;
}


Appointment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  doctor_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  patient_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  appointment_context: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  medical_record_original: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  medical_record_final: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hospital: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
    appointment_status: {
        type: DataTypes.ENUM('PROCESSING', 'ERROR', 'WAITING_APPROVAL', 'APPROVED'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'appointment',
    tableName: 'appointments',
    timestamps: false,
    });

Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });