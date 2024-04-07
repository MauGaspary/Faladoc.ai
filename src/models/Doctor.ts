import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class Doctor extends Model {
  public id!: number;
  public password!: string;
  public name!: string;
  public email!: string;
  public crm!: string;
  public hospital!: string | null;
  public userType!: string;
}

Doctor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  crm: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hospital: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  userType: {
    type: DataTypes.ENUM('ADMIN', 'DOCTOR'),
    allowNull: false,
    field: 'usertype'
  },
}, {
    tableName: 'doctors',
    sequelize,
    timestamps: false,
    underscored: true,
  });
