import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Importez seulement les fonctions que vous avez
import { 
   updateResource,
  getAllResources, 
  uploadResource, 
  deleteResource,
   downloadResource,
  getResourceById  // Si cette fonction existe
} from '../services/resource.services';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Middleware pour vérifier si l'utilisateur est admin
// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req: any, res: any, next: any) => {
  console.log('🔍 Checking admin access for user:', req.user);
  
  if (!req.user) {
    return res.status(401).json({ error: 'Utilisateur non authentifié' });
  }
  
  // Vérifier si le rôle contient "ADMIN" (en majuscules)
  const userRole = req.user.role?.toUpperCase();
  
  if (userRole !== 'ADMIN') {
    console.log('❌ User role is not ADMIN:', userRole);
    return res.status(403).json({ 
      error: 'Accès refusé. Admin uniquement.',
      userRole: userRole,
      requiredRole: 'ADMIN'
    });
  }
  
  console.log('✅ User is ADMIN, proceeding...');
  next();
};

// Créer le dossier uploads
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|ppt|pptx|mp4|avi|mov|mkv|zip|rar/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Type de fichier non autorisé'));
  }
});

// Routes publiques
router.get('/', getAllResources);

// Route pour récupérer une ressource par ID (si la fonction existe)
// Si getResourceById n'existe pas encore, commentez cette ligne temporairement
router.get('/:id', getResourceById);

// Routes protégées (admin seulement)
router.post('/upload', authenticate, isAdmin, upload.single('file'), uploadResource);
router.delete('/:id', authenticate, isAdmin, deleteResource);
router.get('/:id/download', downloadResource);  

router.put('/:id', authenticate, isAdmin, updateResource);

export default router;