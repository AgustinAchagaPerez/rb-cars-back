const express = require("express");
const Car = require("../models/Car");
const router = express.Router();

// Crear un auto
router.post("/", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el auto", error });
  }
});

// Obtener todos los autos
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autos", error });
  }
});

// Obtener un auto por ID
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Auto no encontrado" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el auto", error });
  }
});

// Actualizar un auto
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ message: "Auto no encontrado" });
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el auto", error });
  }
});

// Eliminar un auto
router.delete("/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: "Auto no encontrado" });
    res.status(200).json({ message: "Auto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el auto", error });
  }
});

module.exports = router;
