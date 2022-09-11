

const registro = (req, res) => {
  res.json({ msg: 'Registrando Usuario...' })
}

const perfil = (req, res) => {
  res.json({ msg: 'Perfil del usuario' })
}


export {
  registro,
  perfil,
}