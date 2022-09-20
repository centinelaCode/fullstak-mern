import Veterinario from '../models/Veterinario.js'

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

const perfil = (req, res) => {
  res.json({ msg: 'Perfil del usuario' })
}


export {
  registro,
  perfil,
}