import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from "bcrypt";


export class UserController{
    public static async createLoginUser(req: Request, res: Response){
        try{
            const user = req.body;
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(user.password, salt);
            user.passwordHash = passwordHash;
            user.passwordSalt = salt;
            const newUser = await User.create(user);
            console.log(newUser.id)
            const userFound = await User.findOne({where: {email: user.email}});
            res.status(200).json(userFound!.id);
        }catch (error){
            res.status(500).json({error: "erro ao criar login de usuário"});
        }
    }

    public static async passwordReset(req: Request, res: Response){ 
        try {
            const { token } = req.query;
            const { password } = req.body;

            const request = PasswordReset.findOne({where: {token: token}});

            const actualDate = new Date();
            const requestDate = request.request_date;
            const isExpirationDateValid = requestDate === actualDate;

            if(!isExpirationDateValid){ 
                throw {error: "Solicitação expirada.", status: 400};
            }
            
            const user = await User.findOne({where: {id: request.user_id}});

            if(user){
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);

                user.passwordhash = passwordHash;
                user.passwordsalt = salt;

                await user.save();

                return res.status(200).json({message: "Senha alterada com sucesso."});
            }
        } catch (error){ 
            const { status, message } = error;
            res.status(status).json({error: message});
        }
    }
}