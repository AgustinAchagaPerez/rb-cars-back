import mongoose from 'mongoose';
import Car from './models/Car.js'; 

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rb-cars-back', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

const seedCars = async () => {
  const cars = [
    // Autos para alquiler
    { make: 'Toyota', model: 'Corolla', year: 2021, price: 15000, rentPrice: 50, status: 'alquiler', description: 'Auto en excelente estado para alquilar' },
    { make: 'Ford', model: 'Focus', year: 2020, price: 14000, rentPrice: 40, status: 'alquiler', description: 'Auto cómodo y económico para alquiler' },
    { make: 'Honda', model: 'Civic', year: 2022, price: 25000, rentPrice: 70, status: 'alquiler', description: 'Auto de lujo para alquiler' },
    { make: 'BMW', model: 'X5', year: 2021, price: 40000, rentPrice: 100, status: 'alquiler', description: 'SUV de lujo para alquilar' },
    { make: 'Nissan', model: 'Altima', year: 2022, price: 22000, rentPrice: 60, status: 'alquiler', description: 'Auto familiar para alquilar' },

    // Autos para venta
    { make: 'Chevrolet', model: 'Malibu', year: 2019, price: 22000, rentPrice: null, status: 'venta', description: 'Auto familiar en venta' },
    { make: 'Audi', model: 'A4', year: 2020, price: 35000, rentPrice: null, status: 'venta', description: 'Auto de lujo en venta' },
    { make: 'Mercedes', model: 'C-Class', year: 2021, price: 45000, rentPrice: null, status: 'venta', description: 'Auto de lujo en venta' },
    { make: 'Tesla', model: 'Model 3', year: 2022, price: 60000, rentPrice: null, status: 'venta', description: 'Auto eléctrico en venta' },
    { make: 'Volkswagen', model: 'Golf', year: 2018, price: 15000, rentPrice: null, status: 'venta', description: 'Auto compacto en venta' },
  ];

  try {
    await Car.deleteMany(); // Elimina autos existentes si hay
    await Car.insertMany(cars);
    console.log('Autos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los autos:', error);
  }
};

const run = async () => {
  await connectDB();
  await seedCars();
};

run();
