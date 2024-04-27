import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';


export class Doctor extends Model {
  public id!: string;
  public user_id!: string;
  public name!: string;
  public crm!: string;
  public hospital!: string;
  public specialty!: string;
}

Doctor.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
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
  }
}, {
  sequelize,
  modelName: 'doctor',
  tableName: 'doctors',
  timestamps: false
});