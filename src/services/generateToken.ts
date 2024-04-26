import jwt from 'jsonwebtoken';

function generateToken(user, secretSignature, tokenLife) {
    const data = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    
    const token = jwt.sign(data, secretSignature, { expiresIn: tokenLife });
    
    return token;
}
