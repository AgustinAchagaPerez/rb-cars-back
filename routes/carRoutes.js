import express from 'express'; 
import Car from '../models/Car.js';

const router = express.Router();

// Obtener todos los autos
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un auto
router.post('/', async (req, res) => {
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    status: req.body.status, // 'alquilar' o 'comprar'
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
