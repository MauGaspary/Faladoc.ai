import { where } from "sequelize";
import {PasswordReset} from "../models/PasswordReset";
import { Request, Response } from 'express';

export class PasswordResetController {
    public static async getPasswordReset(req: Request, res: Response) {
        try {
            const {token} = req.params;
          const passwordReset = await PasswordReset.findAll({
            where: {
                token : token
            }
          });
          res.status(200).json(passwordReset);
        } catch (error) {
          console.error("Erro ao buscar requisição de troca de senha", error);
          res.status(500).json({ error: 'Erro ao buscar requisição de troca de senha' });
        }
      }

}

