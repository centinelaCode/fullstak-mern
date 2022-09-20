import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    
    // Conection Mongo Atlas (cluster)
    const db = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connection Mongo localhost
    // const db = await mongoose.connect(process.env.MONGO_DB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    const url =  `${db.connection.host}:${db.connection.port}`;
    console.log(`Mongo DB connected in ${url}`)
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
}

export default conectarDB;