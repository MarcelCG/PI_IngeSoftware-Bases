const express = require('express');
const app = express();
const cors = require('cors'); // Importa el middleware cors
const apiRouter = require('./routes/api'); // Importa el archivo de rutas principal desde la carpeta routes

// Middleware para el manejo de solicitudes JSON
app.use(express.json());

app.use(cors());

// Configura Express para usar las rutas principales en apiRouter
app.use('/api', apiRouter);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Hubo un error en el servidor' });
});

// Inicia el servidor
const port = process.env.PORT || 4223;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
}); 

module.exports = app;
