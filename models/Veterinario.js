import mongoose from 'mongoose';

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
      type: String
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

const Veterinario = mongoose.model('veterinario', veterinarioShema);
export default Veterinario;