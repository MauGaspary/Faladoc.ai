import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from "bcrypt";
import { UserService } from '../services/user-services';


export class UserController {
    public static async createLoginUser(req: Request, res: Response) {
      try {
        const { email, password, userType } = req.body;
        const newUser = await UserService.createLoginUser(email, password, userType);
        res.status(201).json({ id: newUser.id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar login de usuário" });
      }
    }
  

    public static async getUser(req: Request, res: Response){
        try{
            const { email } = req.body;
            const user = await User.findOne({ where: { email: email } });
            if(user){
                delete user.dataValues.passwordhash;
                delete user.dataValues.passwordsalt;
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    public static async passwordReset(req: Request, res: Response){ 
        try {
            const { token } = req.query;
            const { email, password } = req.body;
            const user = await User.findOne({where: {email: email}});
            if(user){
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                user.passwordhash = passwordHash;
                user.passwordsalt = salt;
                await user.save();
                res.status(200).json({message: "Senha alterada com sucesso."});
            }
        } catch (error){ 
            res.status(500).json({error: "Erro ao alterar senha."});
        }
    }
}