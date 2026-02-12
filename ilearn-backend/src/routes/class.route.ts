import express from 'express';
import { classService } from '../services/class.service';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

const router = express.Router();

// Routes protégées
router.use(authenticate);

// POST /api/classes - Créer une classe (enseignants + admin)
router.post('/', authorize(['TEACHER_PRIMARY', 'TEACHER_SECONDARY', 'PROFESSOR_SUPERIOR', 'ADMIN']), 
  async (req, res) => {
    try {
      const classe = await classService.createClass(req.body);
      res.status(201).json(classe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

// GET /api/classes - Toutes les classes
router.get('/', async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    res.json(classes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/classes/:id - Une classe spécifique
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id as string;
    const classe = await classService.getClassById(parseInt(id));
    res.json(classe);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

// PUT /api/classes/:id - Modifier une classe
router.put('/:id', authorize(['TEACHER_PRIMARY', 'TEACHER_SECONDARY', 'PROFESSOR_SUPERIOR', 'ADMIN']), 
  async (req, res) => {
    try {
      const id = req.params.id as string;
      const classe = await classService.updateClass(parseInt(id), req.body);
      res.json(classe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

// DELETE /api/classes/:id - Supprimer une classe
router.delete('/:id', authorize(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id as string;
    const result = await classService.deleteClass(parseInt(id));
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/classes/teacher/:teacherId - Classes d'un professeur
router.get('/teacher/:teacherId', async (req, res) => {
  try {
    const teacherId = req.params.teacherId as string;
    const classes = await classService.getClassesByTeacher(parseInt(teacherId));
    res.json(classes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/classes/school/:schoolId - Classes d'une école
router.get('/school/:schoolId', async (req, res) => {
  try {
    const schoolId = req.params.schoolId as string;
    const classes = await classService.getClassesBySchool(parseInt(schoolId));
    res.json(classes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;