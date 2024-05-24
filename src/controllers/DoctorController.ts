import { Request, Response, request } from 'express';
import { Doctor } from '../models/Doctor';
import { UserController } from './UserController';
import { json } from 'sequelize';
import { User } from '../models/User';
import { Axios, AxiosResponse } from 'axios';
import  UserRoutes  from '../routes/UserRoutes';
import router from '../routes/UserRoutes';

export class DoctorController {
  public static async getAllDoctors(req: Request, res: Response) {
    try {
      const doctors = await Doctor.findAll();
      res.json(doctors);
    } catch (error) {
      console.error("Não consegui zé, malz. Ó o erro ai:", error);
      res.status(500).json({ error: 'Deu ruim' });
    }
  }

  public static async createDoctor(req: Request, res: Response){
    try{
      const doctor = req.body;
      doctor.userType = "Doctor";
      const { email, password, userType } = doctor;
      const req1 = {
          email: email,
          password: password,
          userType: userType
      };

      const newDoctor = await Doctor.create({
        name: doctor.name,
        crm: doctor.crm,
        hospital: doctor.hospital,
        specialty: doctor.specialty,
        userId: id
      });

      res.status(201).json(newDoctor);
    }
    catch(error){
      console.error("erro no create doctor", error);
      res.status(500).json({error:'erro'});
    }
  }

}
