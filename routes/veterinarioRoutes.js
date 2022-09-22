import express from 'express';
import checkAuth from '../middleware/authMiddleware.js'

import { registro, confirmar, autenticar, perfil } from '../controllers/veterinarioController.js'

const router =  express.Router();


router.post('/registro', registro);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar)


router.get('/perfil', checkAuth, perfil);

export default router;