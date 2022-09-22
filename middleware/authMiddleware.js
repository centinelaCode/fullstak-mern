import JWT from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';


const checkAuth = async(req, res, next) => {  
  let token;
  // console.log(req.headers.authorization)  

  if(req.headers.authorization && req.headers.authorization.includes('Bearer ')) {
    try {   
      //se recibe el token del req.headers y se omite la palbra Bearer
      token = req.headers.authorization.split(' ').pop();
  
      // decodificamos el JWT y lo alamanenamos en el request.veterinario (para crear una sesion)
      const decodedJWT = JWT.verify(token, process.env.JWT_SECRET);
      req.veterinario = await Veterinario.findById(decodedJWT.id).select("-password -token -confirmado")
      // console.log(req.veterinario);
      
      return next();
    } catch (e) {
      e = new Error('Token no válido');
      return res.status(403).json({msg: e.message})
    }    
  } 

  if(!token) {
    // en caso de que no incluya token o token sin bearer
    const error = new Error('Token no válido o inexistente');
    return res.status(403).json({msg: error.message})
  }
  
  next();
}


export default checkAuth;