import express from 'express';

import { registro, confirmar, autenticar, perfil } from '../controllers/veterinarioController.js'

const router =  express.Router();


router.post('/registro', registro);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar)


router.get('/perfil', perfil);

export default router;