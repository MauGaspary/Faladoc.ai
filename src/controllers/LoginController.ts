import { Request, Response } from "express";
import { User} from "../models/User";
// importar token 
import bcrypt from "bcrypt";

export class LoginController {
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({where: {/* email: user.email */}});

      if (!findUser) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      const isMatch = await bcrypt.compare(password, /* User.passwordhash */);

      if (!isMatch) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      // retornar o token
      // return res.status(200).json({ token });

    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      res.status(500).json({ error: "Algo deu errado" });
    }
  }
}
