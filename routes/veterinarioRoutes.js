import express from 'express';

import { registro, confirmar, perfil } from '../controllers/veterinarioController.js'

const router =  express.Router();


router.post('/registro', registro);
router.get('/perfil', perfil);
router.get('/confirmar/:token', confirmar);



export default router;