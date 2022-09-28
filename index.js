import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';


import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';


const app = express();
app.use(express.json());
conectarDB();

// config cors
const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
  origin: function(origin, callback) {
    if(dominiosPermitidos.indexOf(origin) !== -1) {
      // si es diferente a -1 el origin del request es permitido
      callback(null, true);
    } else {
      // si es -1 el origin del request no esta permitido
      callback(new Error('No permitido por CORS'));
    }
  }
}
// aplicamos la configuraciond e cors
app.use(cors(corsOptions));


app.use('/api/veterinarios', veterinarioRoutes); // all routes veterinarios
app.use('/api/pacientes', pacienteRoutes); // all routes veterinarios

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})