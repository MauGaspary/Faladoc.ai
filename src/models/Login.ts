import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

export class Login extends Model {
  public id!: string;
  public user_id!: string;
  public admin_id!: string;
  public email!: string;
  public passwordHash!: string;
  public passwordSalt!: string;
}

Login.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: true
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
    }
  },
  {
    tableName: 'login',
    modelName: 'Login',
    sequelize,
    timestamps: false
  }
);
