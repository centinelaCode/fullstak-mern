import Veterinario from '../models/Veterinario.js'

/*
* Method para registrar un usuario
*/
const registro = async (req, res) => {
  const { email } = req.body;
  try {
    // prevenir usuarios duplicados (email)
    const existeUsuario = await Veterinario.findOne({ email })
    if(existeUsuario) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({ msg: error.message })
    }

    // Save new veterinario
    const veterinario = new Veterinario(req.body);
    const vetrinarioGuardado = await veterinario.save();

    res.json(vetrinarioGuardado)
  } catch (error) {
    console.log(error);
  }    
}

/*
* Method para confirmar un usuario
*/
const confirmar = async(req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({token});
  if(!usuarioConfirmar) {
    const error = new Error('Token Ivalido');
    return res.status(404).json({msg: error.message})
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({msg: 'Usuario confirmado Correctamente'});
  } catch (error) {
    console.log(error)
  }
}

/*
* Method para autenticar un usuario
*/
const autenticar = async(req, res) => {
  const { email } = req.body;
  /* 
    pasos para autenticar un usuario
    1.- verificar que el usuario exista(email debe estar registrado    
    2.- Que su cuenta este confirmada
    3.- verificar que el password sea correcto
  */

  // validacion 1
  const usuario = await Veterinario.findOne({email});
  if (!usuario) {
    return res.status(403).json({msg: 'El usuario no existe'})
  }

  // validación 2
  if(!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(403).json({msg: error.message})
  }

  // validacion 3


  // authenticar el usuario
  console.log(req.body);
  res.json({msg: 'Autenticando'})
}





const perfil = (req, res) => {
  res.json({ msg: 'Perfil del usuario' })
}


export {
  registro,
  confirmar,
  autenticar,
  perfil,
}