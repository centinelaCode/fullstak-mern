import express from 'express';
const router = express.Router();

import {
  agregarPacientes,
  obtenerPacientes,
} from '../controllers/paciente.controller.js'

router.post('/', agregarPacientes)
router.get('/', obtenerPacientes)


export default router;