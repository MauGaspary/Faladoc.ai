import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class Admin extends Model {
  public id!: string;
  public user_id!: string;
  public name!: string;
}

Admin.init({
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
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admins',
  timestamps: false
});