import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

export class Patient extends Model {
  public id!: string;
  public cpf!: string;
  public name!: string;
  public date_of_birth!: Date;
}

Patient.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [11, 11],
      },
    },
  },
  {
    sequelize,
    modelName: "patient",
    tableName: "patients",
    timestamps: false,
  }
);
