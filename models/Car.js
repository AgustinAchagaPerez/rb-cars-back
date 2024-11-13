import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true }, // Precio de compra
  rentPrice: { type: Number }, // Precio de alquiler (opcional)
  status: { type: String, enum: ['alquiler', 'venta'], required: true }, // Alquiler o venta
  description: { type: String }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
