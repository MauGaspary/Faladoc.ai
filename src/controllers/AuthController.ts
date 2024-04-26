import { Request, Response } from 'express';

export class AuthController {
    public static logout(req: Request, res: Response) {
        try {
            //TODO: pegar token do cliente
            const token = req.headers.authorization;

            if(!token) {
                throw { status: 401, message: 'Token not found.'};
            }

            //TODO:
            // Excluir token do cliente
            // Invalidar JWT

            res.status(200).json({ message: 'Logout successfully.' });
        } catch (err) {
            const status = err.status || 400
            const error = err.message || 'Error.';
            
            res.status(status).json({ error });
        }
    }
}