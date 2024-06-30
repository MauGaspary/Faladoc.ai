import { Request, Response } from 'express';
import { Doctor } from '../models/Doctor';
import { UserService } from '../services/user-services';
import { CfmService } from '../services/cfm-service';

export class DoctorController {
  public static async getAllDoctors(req: Request, res: Response) {
    try {
      const doctors = await Doctor.findAll();
      res.json(doctors);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      res.status(500).json({ error: 'Erro ao buscar médicos' });
    }
  }

  public static async createDoctor(req: Request, res: Response) {
    try {
      const { name, crm, hospital, email, password, specialty } = req.body;
      const user = await UserService.createLoginUser(email, password, 'DOCTOR');
      if (user) {
        const doctor = await Doctor.create({
          user_id: user.id,
          name,
          crm,
          hospital: hospital || null,
          specialty: specialty || null
        });
        res.status(200).json(doctor);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating doctor" });
    }
  }

  public static async getDoctorCfmData(req: Request, res: Response) {
    try {
      const { crm, state } = req.params;
      const doctorData = await CfmService.findDoctorData(crm, state);
      if (!doctorData) {
        return res.status(404).json({error: 'Médico não encontrado'});
      }
      res.json(doctorData);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar dados do médico'  });
    }
  }
  
}
