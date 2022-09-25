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

  // valida que el el id del paciente sea valido
  if(!paciente) {
    const error = new Error('Hubo un Error, no se puedo identificar el paciente');
    return res.status(400).json({msg: error.message});
  }
  
  // for debug and test
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


/*
* Method para actualizar un pacientye
*/
const actualizarPaciente = async(req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findById(id);

  // valida que el el id del paciente sea valido
  if(!paciente) {
    const error = new Error('Hubo un Error, no se puedo identificar el paciente');
    return res.status(404).json({msg: error.message});
  }
  
  // verificamos que el paciente sea del veterinario que tiene sesión
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({msg: 'Accion no valida'});
  }

  // Actualizamos los valores 
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    // const pacienteActualizado = await Paciente.findByIdAndUpdate(id, update, options)
    const pacienteActualizado = await paciente.save();
    return res.json(pacienteActualizado)
  } catch (error) {
    console.log(error)
  }
}


const eliminarPaciente = async(req, res) => {}


export {
  agregarPacientes,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
}