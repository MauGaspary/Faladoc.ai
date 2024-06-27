import { Request, Response } from "express";
import { User } from "../models/User";
import { PasswordReset } from "../models/PasswordReset";
import { generateCode } from "../services/generateToken";
import axios from "axios";

export class PasswordResetController {
  public static async createPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const findUser = await User.findOne({ where: { email: email } });

      if (findUser) {
        const generatedCode = generateCode();
        const resetPassword = await PasswordReset.create({
          user_id: findUser.id,
          token: generatedCode,
          created_at: new Date(),
          expiration_date: new Date(Date.now() + 1800000),
        });

        if (resetPassword) {
          let data = JSON.stringify({
            transactionalId: process.env.TRANSACTIONAL_ID,
            email: email,
            dataVariables: {
              authenticateCode: generatedCode,
            },
          });

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://app.loops.so/api/v1/transactional",
            headers: {
              Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              return res.status(201).json({
                message: "Código de recuperação de senha enviado com sucesso",
                code: generatedCode,
              });
            })
            .catch(async (err) => {
              console.error({
                res: err,
              });
              await PasswordReset.destroy({
                where: { user_id: resetPassword.user_id },
              });
              return res.status(403).json({
                error: "Erro ao enviar email de recuperação de senha",
              });
            });
        } else {
          return res
            .status(400)
            .json({ error: "Erro ao criar o código de recuperação de senha" });
        }
      } else {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      res.status(500).json({ error: "Algo deu errado" });
    }
  }

  public static async getPasswordReset(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const passwordReset = await PasswordReset.findAll({
        where: {
          token: token,
        },
      });
      res.status(200).json(passwordReset);
    } catch (error) {
      console.error("Erro ao buscar requisição de troca de senha", error);
      res
        .status(500)
        .json({ error: "Erro ao buscar requisição de troca de senha" });
    }
  }
}
