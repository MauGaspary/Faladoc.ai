import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from "bcrypt";

export class UserController{
    public static async createLoginUser(req: Request, res: Response){
        try{
            const { email, password, userType } = req.body;
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                email: email,
                passwordhash: passwordHash, 
                passwordsalt: salt,        
                userType: userType
            });

            delete newUser.dataValues.password;
            res.status(201).json({ id: newUser.id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar login de usuário" });
        }
    }
}


