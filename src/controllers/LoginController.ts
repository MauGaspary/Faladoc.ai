import { Request, Response } from 'express';
import { Login } from '../models/Login';
import { bcrypt } from "bcryptjs";


export class LoginController{
    public static async createLoginUSer(req: Request, res: Response){
        try{
        const login = req.body;
        login.password = await bcrypt.hash(login.password)
        res.status(200).json()
        }catch (error){
            res.status(500).json({error: "erro"});
        }
    }
}