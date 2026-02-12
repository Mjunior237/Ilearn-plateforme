import User from '../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

class AuthService {
  async register(data: {
    
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    educationLevel: 'PRIMARY' | 'SECONDARY' | 'SUPERIOR'; // ← REQUIS
    role: 'STUDENT_PRIMARY' | 'STUDENT_SECONDARY' | 'STUDENT_SUPERIOR' | 'TEACHER_PRIMARY' | 'TEACHER_SECONDARY' | 'PROFESSOR_SUPERIOR' | 'ADMIN';
    age?: number;
    phone?: string;
  }) {
    const exists = await User.findOne({ where: { email: data.email } });
    if (exists) {
      throw new Error('Email déjà utilisé');
    }

  

    const user = await User.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      educationLevel: data.educationLevel, // ← REQUIS
      role: data.role,
      age: data.age,
      phone: data.phone
    });

  console.log('✅ User created:', { 
    id: user.id, 
    email: user.email, 
    isActive: user.isActive,
    isEmailVerified: user.isEmailVerified 
  }); // ← AJOUTER
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      educationLevel: user.educationLevel,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt
    };

    return { user: userResponse, token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Identifiants incorrects');

   // if (!user.isActive) {
   //   throw new Error('Compte désactivé');
   // }

    const valid = await user.comparePassword(password);
    if (!valid) throw new Error('Identifiants incorrects');

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      educationLevel: user.educationLevel,
      role: user.role,
      isActive: user.isActive
    };

    return { user: userResponse, token };
  }
}

export const authService = new AuthService();