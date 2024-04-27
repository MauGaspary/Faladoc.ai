import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export class User extends Model {
  public id!: string;
  public email!: string;
  public passwordHash!: string;
  public passwordSalt!: string;
  public userType!: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordSalt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userType: {
    field: 'usertype',
    type: DataTypes.ENUM('ADMIN', 'DOCTOR'),
    allowNull: false
  }
}
  ,{
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: false
  });
