import express from 'express';
const router = express.Router();

import {
  agregarPacientes,
  obtenerPacientes,
} from '../controllers/paciente.controller.js'
import checkAuth from '../middleware/authMiddleware.js';

router.post('/', checkAuth, agregarPacientes)
router.get('/', obtenerPacientes)


export default router;