import { Model, DataTypes, where, Op } from "sequelize";
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

export interface PatientQueryParams {
  id?: string;
  date_of_birth?: Date;
  name?: string;
  cpf?: string;
}

export function buildPatientQueryParams(query: PatientQueryParams) {

  const {id, date_of_birth, name, cpf} = query;
  let whereCondition: { [key: string]: any } = {};

  if (id) {
    whereCondition['id'] = {[Op.eq]: id};
  }

  if (date_of_birth) {
    whereCondition['date_of_birth'] = {[Op.eq]: date_of_birth};
  }

  if (name) {
    whereCondition['name'] = {[Op.like]: `%${name}%`};
  }

  if (cpf) {
    whereCondition['cpf'] = {[Op.eq]: cpf};
  }

  return { whereCondition};
}