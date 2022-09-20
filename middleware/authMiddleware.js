
const checkAuth = (req, res, next) => {
  
  if(req.headers.authorization && req.headers.authorization.includes('Bearer ')) {
    console.log('Si hay Bearer')
  } 


  // en caso de que no incluya token o token sin bearer
  const error = new Error('Token no válido o inexistente');
  res.status(403).json({msg: error.message})

  next();
}

export default checkAuth;