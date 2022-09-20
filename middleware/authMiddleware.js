
const checkAuth = (req, res, next) => {
  console.log('Desde mi Middelware');

  next();
}

export default checkAuth;