import express from 'express';
const router = express.Router();

import {
  agregarPacientes,
  obtenerPacientes,
} from '../controllers/paciente.controller.js'
import checkAuth from '../middleware/authMiddleware.js';

router.post('/', checkAuth, agregarPacientes)
router.get('/', checkAuth, obtenerPacientes)


export default router;