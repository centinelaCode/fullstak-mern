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
* Method para obtenerr todos los pacientes del vetrinario que tiene sesion
*/
const obtenerPacientes = async(req, res) => {
  const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)

  res.json(pacientes);
}


/*
* Method para obtener un paciente
*/
const obtenerPaciente = async(req, res) => {
  const { id } = req.params;
  
  const paciente = await Paciente.findById(id);
  
  // console.log(paciente.veterinario._id);
  // console.log(req.veterinario._id);
  
  // verificamos que el paciente sea del veterinario que tiene sesión
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({msg: 'Accion no valida'});
  }

  // retornamos el veterinario que
  if(paciente) {    
    return res.json(paciente);
  }
}





const actualizarPaciente = async(req, res) => {}
const eliminarPaciente = async(req, res) => {}


export {
  agregarPacientes,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
}