import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('❌ No authorization header');
      return res.status(401).json({ error: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('❌ No token in authorization header');
      return res.status(401).json({ error: 'Token manquant' });
    }

    console.log('🔐 Verifying token:', token.substring(0, 20) + '...');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    
    console.log('✅ Token decoded:', {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    });
    
    // Ajouter l'utilisateur à la requête
    (req as any).user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    console.log('👤 User added to request:', (req as any).user);
    
    next();
  } catch (error) {
    console.error('❌ Auth error:', error);
    return res.status(401).json({ error: 'Token invalide' });
  }
};