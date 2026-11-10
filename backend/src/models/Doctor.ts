import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class Doctor extends Model {
  public id!: string;
  public name!: string;
  public crm!: string;
  public hospital!: string; 
  public specialty!: string;
  public userType!: string;
}

Doctor.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  crm: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: true
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userType: {
    field: 'usertype',
    type: DataTypes.ENUM('ADMIN', 'DOCTOR'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Doctor',
  tableName: 'doctors',
  timestamps: false
});