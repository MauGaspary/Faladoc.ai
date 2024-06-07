import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../services/generateToken";
import bcrypt from "bcrypt";
import { Doctor } from "../models/Doctor";

export class LoginController {
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ where: { email: email } });

      if (findUser) {
        const isMatch = await bcrypt.compare(password, findUser.passwordhash);
        if (isMatch) {
          const doctor = await Doctor.findOne({ where: { user_id: findUser.id } });
          return res.status(200).json({ token: generateToken(findUser), doctor: doctor });
        } else {
          return res.status(401).json({ error: "Email ou senha inválidos" });
        }
      } else {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      res.status(500).json({ error: "Algo deu errado" });
    }
  }
}
