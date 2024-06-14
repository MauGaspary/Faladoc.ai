import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { AppointmentService } from "../services/appointment-services";

export class AppointmentsController {
  public static async createAppointment(req: Request, res: Response) {
    try {
      const appointment = req.body;
      appointment.appointment_date = Date.now();
      appointment.duration = 0;
      appointment.appointment_status = "PROCESSING";
      const newAppointment = await Appointment.create(appointment);

      //AppointmentsController.processAudio(res, req);

      res.status(200).json({ message: "Created!" });
    } catch (error) {
      console.error("Erro ao criar consulta", error);
      res.status(500).json({ error: "Erro ao criar consulta" });
    }
  }

  public static async updateAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = req.body;
      appointment.appointment_status = "APPROVED";
      const linesChanged = await Appointment.update(appointment, {
        where: { id },
      });
      const updateAppointment = await Appointment.findOne({ where: { id } });
      res.status(200).json(updateAppointment);
    } catch (error) {
      console.log("Erro ao atualizar consulta", error);
      res.status(500).json({ error: "Erro ao atualizar consulta" });
    }
  }

  public static async getAppointments(req: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getAppointments(req.query);
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Erro ao buscar consultas", error);
      res.status(500).json({ error: "Erro ao buscar consultas" });
    }
  }

  public static async getAppointmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointments = await Appointment.findOne({ where: { id } });
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Erro ao buscar consultas", error);
      res.status(500).json({ error: "Erro ao buscar consultas" });
    }
  }

  public static async deleteAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AppointmentService.deleteAppointment(id);
      res.status(200).end();
    } catch (error) {
      console.error("Erro ao deletar consulta", error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao deletar consulta" });
      }
    }
  }

  public static async processAudio(req: Request, res: Response) {
    const API_URL = "https://0njnx.apps.beam"; // TODO: Change for a env var
    try {
      const startContainer = await fetch(`${API_URL}/api/v1/inicio`);

      if (!startContainer.ok) {
        return res.status(500).json({ message: "Failed to start container" });
      }

      const formData = new FormData();
      formData.append("audio_file", req.file.buffer, req.file.originalname);
      formData.append("context", req.body.context);

      const prontuariosResponse = await fetch(`${API_URL}/api/v1/prontuario`, {
        method: "POST",
        body: formData,
      });

      if (!prontuariosResponse.ok) {
        return res.status(500).json({ message: "Failed to send prontuarios" });
      }

      const jsonResponse = await prontuariosResponse.json();
      return res.status(200).json(jsonResponse);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
