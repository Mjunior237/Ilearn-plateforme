import { Router } from 'express';
import { authService } from '../services/auth.services';

const router = Router();

router.post('/register', async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  try {
    const result = await authService.register(req.body);
     res.status(201).json(result); 
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);  // ← Retourne { user, token }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});



export default router;
