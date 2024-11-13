import express from 'express';
import mongoose from 'mongoose';
import carRoutes from './routes/carRoutes.js';  
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rb-cars-back', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));

// Rutas de autos
app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
