import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import generarId from '../helpers/generarId.js'

const veterinarioShema =  mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    telefono: {
      type: String,
      default: null,
      trim:true,
    },
    web: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: generarId(),
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timesStamps: true,
    versionKey: false,
  }
);

veterinarioShema.pre('save', async function(next) {
  // para no hashear un passwor hasheado
  if(!this.isModified('password')) {
    next();
  }  

  // hasheamos el password antes de guardarlo en la base de datos
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

const Veterinario = mongoose.model('veterinario', veterinarioShema);
export default Veterinario;