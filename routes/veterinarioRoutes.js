import express from 'express';

import { registro, confirmar, autenticar, perfil } from '../controllers/veterinarioController.js'

const router =  express.Router();


router.post('/registro', registro);
router.get('/perfil', perfil);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar)



export default router;