// routes/user.route.ts - VERSION CORRIGÉE
import express from 'express';
import { userService } from '../services/user.service';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

const router = express.Router();

// Routes protégées
router.use(authenticate);

// GET /api/users/profile - Profil de l'utilisateur connecté
router.get('/profile', async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.getUserProfile(userId);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users - Tous les utilisateurs (admin seulement)
router.get('/', authorize(['ADMIN']), async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/:id - Un utilisateur spécifique (admin)
router.get('/:id', authorize(['ADMIN']), async (req, res) => {
  try {
    // CORRECTION ICI : Utiliser 'as string' pour forcer le type
    const id = req.params.id as string;
    const user = await userService.getUserById(parseInt(id));
    res.json(user);
  } catch (error: any) {
    if (error.message === 'Utilisateur non trouvé') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT /api/users/profile - Mettre à jour son profil
router.put('/profile', async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.updateUser(userId, req.body);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/users/:id - Mettre à jour un utilisateur (admin)
router.put('/:id', authorize(['ADMIN']), async (req, res) => {
  try {
    // CORRECTION ICI
    const id = req.params.id as string;
    const user = await userService.updateUser(parseInt(id), req.body);
    res.json(user);
  } catch (error: any) {
    if (error.message === 'Utilisateur non trouvé') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// DELETE /api/users/:id - Désactiver un utilisateur (admin)
router.delete('/:id', authorize(['ADMIN']), async (req, res) => {
  try {
    // CORRECTION ICI
    const id = req.params.id as string;
    const result = await userService.deleteUser(parseInt(id));
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Utilisateur non trouvé') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// GET /api/users/role/:role - Utilisateurs par rôle (admin)
router.get('/role/:role', authorize(['ADMIN']), async (req, res) => {
  try {
    // CORRECTION ICI
    const role = req.params.role as string;
    const users = await userService.getUsersByRole(role);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/level/:level - Utilisateurs par niveau d'éducation
router.get('/level/:level', authorize(['ADMIN', 'TEACHER_PRIMARY', 'TEACHER_SECONDARY', 'PROFESSOR_SUPERIOR']), 
  async (req, res) => {
    try {
      // CORRECTION ICI
      const level = req.params.level as string;
      const users = await userService.getUsersByEducationLevel(level);
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;