import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';

import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';


/*
* Method para registrar un usuario
*/
const registro = async (req, res) => {
  const { email, nombre } = req.body;
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

    // Envio del Email
    emailRegistro({
      email,
      nombre,
      token: vetrinarioGuardado.token,
    });


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
  const { email, password } = req.body;
  /* 
    ! Validaciones para poder autenticar
    !1.- verificar que el usuario exista(email debe estar registrado    
    !2.- Que su cuenta este confirmada
    !3.- verificar que el password sea correcto
  */

  // validacion 1 (que este registrado el email)
  const usuario = await Veterinario.findOne({email});
  if (!usuario) {
    return res.status(403).json({ msg: 'El usuario no existe' })
  }

  // validación 2 (que este confirmada la cuenta)
  if(!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(403).json({ msg: error.message })
  }

  // validacion 3 (que el password sea correcto)
  if(!await usuario.compararPassword(password)){
    const error = new Error('Tus datos de acceso no son validos')
    return res.status(403).json({ msg: error.message })
  }
  
  /* 
    ! pasos para autenticar un usuario
    !1.- Generar un JWT
  */    
  
  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token: generarJWT(usuario.id),
  })
}



/*
* Method para recuperar password - valida el email del usurio
*/
const olvidePassword = async(req, res) => {
  const { email } = req.body;
  
  const  existeVetrinario = await Veterinario.findOne({ email: email });
  if(!existeVetrinario) {
    const error = new Error('El usurio no existe');
    return res.status(400).json({msg: error.message})
  }

  try {
    existeVetrinario.token = generarId();
    await existeVetrinario.save();


    // Enviar Email

    emailOlvidePassword({
      email,
      nombre: existeVetrinario.nombre,
      token: existeVetrinario.token,

    });


    res.json({msg: 'Hemos enviado un email con las instrucciones'});
  } catch (error) {
    console.log(error)
  }  
}


/*
* Method para recuperar password - para leer y validar el token
*/
const comprobarToken = async(req, res) => {
  const { token } = req.params;
  
  const tokenValido = await Veterinario.findOne({ token })
  if(tokenValido) {
    // El Token es valido y el usuario existe

    res.json({msg: 'Token valido y el usuario existe'})
  } else {
    // El Token no es valido, el usuario no existe
    const error = new Error('El token no válido');
    return res.status(400).json({msg: error.message});
  } 
}



/*
* Method para recuperar password - para guardar el nuvo password
*/
const nuevoPassword = async(req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  const veterinario = await Veterinario.findOne({ token })
  if(!veterinario) {    
    const error = new Error('Hubo un Error');
    return res.status(400).json({msg: error.message})
  } 

  try {
    
    // eliminamos el tokenValido y guardamos el nuevo password
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();

    res.json({msg: 'Password modificado correctamente'});
  } catch (error) {
    console.log(error)
  }
}


/*
* Method para el perfil
*/
const perfil = (req, res) => {
  // obtenemos el usuario que hizo auth desde la sesion que creamos req.veterinario
  const {veterinario} = req;


  res.json(veterinario)
}



/*
* Method para el perfil
*/
const actualizarPerfil = async(req, res) => {
  const { id } = req.params
  
  const veterinario = await Veterinario.findById(id);
  if(!veterinario) {
    const error = new Error('Error inesperado')
    return res.status(400).json({msg: error.message})
  }

  try {

    const {email} = req.body;
    // verificamos quer el email no este registrado en la DB
    if(veterinario.email !== req.body.email){
      // significa que cambio el email
      const existeEmail = await Veterinario.findOne({email})

      if(existeEmail) {
        const error = new Error('El Email ya esta registrado!!')
        return res.status(400).json({msg: error.message})
      }
    }
    
    // sobre escibimos las propiedades
    veterinario.nombre = req.body.nombre;
    veterinario.email = req.body.email;
    veterinario.web = req.body.web;
    veterinario.telefono = req.body.telefono;

    const veterinarioActualizado = await veterinario.save();
    res.json(veterinarioActualizado);

  } catch (error) {
    console.log(error)
  }
  
}


export {
  registro,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  actualizarPerfil,
}