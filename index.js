import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import conectarDB from './config/db.js';


const app = express();

conectarDB();

app.use('/', (req, res) => {
  res.send('Hola Mundo!!')
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})