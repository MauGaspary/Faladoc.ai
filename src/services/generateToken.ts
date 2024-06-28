import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TOKEN_SECRET || !process.env.TOKEN_EXPIRATION) {
    throw new Error('Env variables TOKEN_SECRET and TOKEN_EXPIRATION must be set.')
}

const tokenSecret: string = process.env.TOKEN_SECRET;
const tokenExpiration: string = process.env.TOKEN_EXPIRATION;

export function generateToken(user: User): string {
    try {
        if (!user || !user.id || !user.email || !user.userType) {
            throw new Error('Invalid user data.');
        }

        const signOptions: SignOptions = {
            expiresIn: tokenExpiration,
        };

        const token: string = jwt.sign(
            {
                id: user.id,
                email: user.email,
                userType: user.userType,
            },
            tokenSecret,
            signOptions
        );

        return token;
    } catch (error) {
        console.error('Error generating token', error);
        throw new Error('Error generating token.');
    }
}

export function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }