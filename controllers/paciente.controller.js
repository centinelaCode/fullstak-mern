import Paciente from '../models/Paciente.js';


/*
* Method para agregar un pacientes
*/
const agregarPacientes = async(req, res) => {
  const paciente = new Paciente(req.body);

  // se asigna el id del veterinario en la propiedad veterianrio de la intacia de paciente
  paciente.veterinario = req.veterinario._id;  
  
  try {  
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
    
  } catch (error) {
    error = new Error('Error no se puedo guardar el paciente');
    return res.status(400).json({msg: error.message});
  }
}


/*
* Method para obtenerr un pacientes
*/
const obtenerPacientes = async(req, res) => {
  const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)

  res.json(pacientes);
}


export {
  agregarPacientes,
  obtenerPacientes,
}