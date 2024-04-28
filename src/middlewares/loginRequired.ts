import jwt, { TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
      export interface Request {
        user?: {
            id: string;
            email: string;
            userType: string;
      }
    }
  }
}

dotenv.config();

if (!process.env.TOKEN_SECRET) {
    throw new Error('Env variable TOKEN_SECRET must be set.');
}
const tokenSecret: string = process.env.TOKEN_SECRET;

export default function (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization || typeof authorization !== 'string') {
        return res.status(401).json({ error: 'Login required' });
    }

    const [, token] = authorization.split(' ');

    try {
        const decoded = jwt.verify(token, tokenSecret, {
            ignoreExpiration: false 
        });
        const { id, email, userType } = decoded as { id: string, email: string, userType: string };

        req.user = { id, email, userType };

        return next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};
