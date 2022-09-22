import express from 'express';
import checkAuth from '../middleware/authMiddleware.js'

import { 
  registro, 
  confirmar, 
  autenticar, 
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from '../controllers/veterinarioController.js'

const router =  express.Router();

// Area publica
router.post('/registro', registro);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
// para reset password
router.post('/olvide-password', olvidePassword);        // valida el email del usurio
router.get('/olvide-password/:token', comprobarToken);  // para leer y validar el token
router.post('/olvide-password/:token', nuevoPassword)   // para guardar el nuevo password

// get y post al mismo endpoint - seri alo mismo
// router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Aréa privada
router.get('/perfil', checkAuth, perfil);

export default router;