const express = require('express');
const router = express.Router();
const Libres =
  require('../../controllers/libresController/libresController');

async function actualizarTodos(req, res) {
  try {
      const { cedula_empresa } = req.params;
      const empleadosModificados = 
      await Libres.actualizarTodos(cedula_empresa);
      if(empleadosModificados >= 0){
        res.status(200).json(empleadosModificados);
      } else{
        res.status(400).json({ error: "ERROR: datos incorrectos" });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

module.exports = {
  actualizarTodos
};



