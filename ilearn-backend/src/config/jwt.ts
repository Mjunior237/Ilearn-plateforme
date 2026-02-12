import dotenv from 'dotenv';
dotenv.config();

// Sécurité : on s'assure que les secrets existent
if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET manquant dans le fichier .env');
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET manquant dans le fichier .env');
}

export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,

  accessExpiresIn: '15m',
  refreshExpiresIn: '7d'
};
