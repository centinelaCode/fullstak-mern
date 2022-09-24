import express from 'express';
const router = express.Router();

import {
  agregarPacientes,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from '../controllers/paciente.controller.js';
import checkAuth from '../middleware/authMiddleware.js';

router.post('/', checkAuth, agregarPacientes)
router.get('/', checkAuth, obtenerPacientes)
router.get('/:id', checkAuth, obtenerPaciente)
router.put('/:id', checkAuth, actualizarPaciente)
router.delete('/:id', checkAuth, eliminarPaciente)


export default router;