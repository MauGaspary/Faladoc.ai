import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class Admin extends Model {
  public id!: string;
  public name!: string;
  public userType!: string;
}

Admin.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userType: {
    field: 'usertype',
    type: DataTypes.ENUM('ADMIN', 'DOCTOR'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admins',
  timestamps: false
});