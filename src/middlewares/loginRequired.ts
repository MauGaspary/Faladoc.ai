import jwt from 'jsonwebtoken';
import { Login } from '../models/Login';

export default async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Login required' });
    }

    const [, token] = authorization.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email, isAdmin } = decoded;
        const user = await Login.findOne({ where: { id, email } });
        if (isAdmin) {
            req.loginAdminId = { id };
        } else {
            req.loginUserId = { id };
        }
        req.loginEmail = { email };

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}