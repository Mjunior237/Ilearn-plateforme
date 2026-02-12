// app.ts - VERSION CORRIGÉE
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import schoolRoutes from './routes/school.route';
import classRoutes from './routes/class.route';
import resourceRoutes from './routes/resource.route';
import path from 'path';
import fs from 'fs';

const app = express();

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Dossier uploads créé');
}

// Middleware de sécurité
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Vos deux ports frontend
  credentials: true
}));

// Middleware de logging
app.use(morgan('dev'));

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/resources', resourceRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'iLearn API',
    version: '1.0.0'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'iLearn API',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      schools: '/api/schools',
      classes: '/api/classes',
      resources: '/api/resources',
      health: '/api/health',
         uploads: '/uploads'
    }
  });
});

// Route 404 - DOIT ÊTRE APRÈS TOUTES LES ROUTES
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      '/api/auth', 
      '/api/users', 
      '/api/schools', 
      '/api/classes',
      '/api/resources',
      '/api/health', 
      '/',
       '/uploads'
    ]
  });
});

// Middleware d'erreur global - DOIT ÊTRE LE DERNIER
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;