import Car from '../models/Car.js';

// Crear un nuevo auto
export const createCar = async (req, res) => {
  try {
    const { make, model, year, price, rentPrice, status, description } = req.body;
    
    const car = new Car({ make, model, year, price, rentPrice, status, description });
    await car.save();
    
    res.status(201).json({ message: 'Auto creado exitosamente', car });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el auto', error });
  }
};

// Obtener todos los autos
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los autos', error });
  }
};

// Obtener autos por tipo (alquiler o venta)
export const getCarsByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const cars = await Car.find({ status });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los autos', error });
  }
};

// Actualizar un auto
export const updateCar = async (req, res) => {
  const { id } = req.params;
  const { make, model, year, price, rentPrice, status, description } = req.body;
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, {
      make, model, year, price, rentPrice, status, description
    }, { new: true });
    
    if (!updatedCar) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.status(200).json({ message: 'Auto actualizado exitosamente', updatedCar });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el auto', error });
  }
};

// Eliminar un auto
export const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    
    if (!deletedCar) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.status(200).json({ message: 'Auto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el auto', error });
  }
};
