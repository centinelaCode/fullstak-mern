import Veterinario from '../models/Veterinario.js'

const registro = async (req, res) => {
  // const {email, password, nombre} = req.body;
  try {
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