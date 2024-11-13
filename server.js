const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());  // Para parsear los cuerpos de las peticiones en formato JSON
app.use(cors());  // Habilitar CORS

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.error("Error al conectar con MongoDB", err));


app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de RB-Cars!");
});

// Configuración del puerto
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

//Agrego archivo de rutas acá:
const carRoutes = require("./routes/carRoutes");
app.use("/api/cars", carRoutes);
