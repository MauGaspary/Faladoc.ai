import { User } from '../models/User';
import bcrypt from "bcrypt";

export class UserService {
    public static async createLoginUser(email: string, password: string, userType: string) {
      try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          email: email,
          passwordhash: passwordHash,
          passwordsalt: salt,
          userType: userType
        });
  
        delete newUser.dataValues.password;
        return newUser;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao criar login de usuário");
      }
    }
  }