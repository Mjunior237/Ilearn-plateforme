// src/middleware/authorize.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Déclaration pour TypeScript
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: string;
      };
    }
  }
}

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const userRole = req.user.role;
    
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ 
        error: 'Accès interdit',
        requiredRoles: allowedRoles,
        yourRole: userRole
      });
    }
  };
};