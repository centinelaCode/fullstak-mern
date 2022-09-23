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
    console.log(error);
  }

  // console.log(paciente);
}


/*
* Method para obtenerr un pacientes
*/
const obtenerPacientes = (req, res) => {}


export {
  agregarPacientes,
  obtenerPacientes,
}