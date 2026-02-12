// routes/school.route.ts - CORRECTION
import express from 'express';
import { schoolService } from '../services/school.service';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

const router = express.Router();

// Routes publiques
router.get('/', async (req, res) => {
  try {
    const schools = await schoolService.getAllSchools();
    res.json(schools);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id as string; // ← AJOUTER 'as string'
    const school = await schoolService.getSchoolById(parseInt(id));
    res.json(school);
  } catch (error: any) {
    if (error.message === 'École non trouvée') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Routes protégées
// POST /api/schools - Créer une école (admin seulement)
router.post('/', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const school = await schoolService.createSchool(req.body);
    res.status(201).json(school);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/schools/:id - Modifier une école (admin)
router.put('/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id as string; // ← AJOUTER 'as string'
    const school = await schoolService.updateSchool(parseInt(id), req.body);
    res.json(school);
  } catch (error: any) {
    if (error.message === 'École non trouvée') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// DELETE /api/schools/:id - Supprimer une école (admin)
router.delete('/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id as string; // ← AJOUTER 'as string'
    const result = await schoolService.deleteSchool(parseInt(id));
    res.json(result);
  } catch (error: any) {
    if (error.message === 'École non trouvée') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// GET /api/schools/type/:type - Écoles par type
router.get('/type/:type', async (req, res) => {
  try {
    const type = req.params.type as string; // ← AJOUTER 'as string'
    const schools = await schoolService.getSchoolsByType(type);
    res.json(schools);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/schools/stats/count - Nombre d'écoles (admin)
router.get('/stats/count', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const count = await schoolService.countSchools();
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;