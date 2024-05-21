import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../services/generateToken';
import { PasswordReset } from "../models/PasswordReset";

export class PasswordResetController{
  public static async createPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const findUser = await User.findOne({ where: { email: email } });

      if (findUser) {
        const generatedToken = generateToken(findUser);
        const resetPassword = await PasswordReset.create({
          userId: findUser.id,
          token: generatedToken,
          created_at: new Date(),
          expiration_date: new Date(Date.now() + 1800000)
        });
        
        if (resetPassword) {
        const options = {
          method: 'POST',
          headers: {Authorization: `Bearer ${process.env.BEARER_TOKEN}`, 'Content-Type': 'application/json'},
          body: `{"email":"${email}","transactionalId":"${process.env.TRANSACTIONAL_ID}","dataVariables":{ "resetUrl": "${process.env.RESET_URL}?token=${generatedToken}" }}`
        };
        
        fetch('https://app.loops.so/api/v1/transactional', options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
          
        return res.status(201).json({ message: "Token de recuperação de senha criado com sucesso" });
      } else {
        return res.status(400).json({ error: "Erro ao criar token de recuperação de senha" });
      }
          
      } else {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      res.status(500).json({ error: "Algo deu errado" });
    }
  }
}