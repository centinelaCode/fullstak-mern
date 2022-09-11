import express from 'express';

import { registro, perfil } from '../controllers/veterinarioController.js'

const router =  express.Router();


router.post('/registro', registro);

router.get('/perfil', perfil);



export default router;