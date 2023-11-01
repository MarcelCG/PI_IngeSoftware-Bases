const express = require('express');
const router = express.Router();
const CorreoServicio = require('../correoServicios/correoServicios');
const EmpresaModel = require('../../models/empresaModel/empresasModel');
const EmpleModel = require('../../models/usuarioModel/Empleado/empleadoModel');

const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const rutaPlantilla = path.join(__dirname, 'Terminacion.handlebars');
const ruta = fs.readFileSync(rutaPlantilla, 'utf8');
const plantilla = handlebars.compile(ruta);

async function editarEmpresa(empresa) {
  try {
    const estadoEdicion = await EmpresaModel.editarEmpresa(empresa);
    return estadoEdicion;
  } catch (error) {
    throw error;
  }
}

async function borrarEmpresa(cedula_juridica) {
  try {
    const nombreEmpresa = await EmpresaModel.getEmpresaByCedula(cedula_juridica);
    const Empleados = await EmpleModel.getAllByEmpresa(cedula_juridica);

    const estado = await EmpresaModel.borrarEmpresa(cedula_juridica);
    if (estado === true) {
      await notificarTerminacion(nombreEmpresa.nombre, cedula_juridica, Empleados);
    }
    return estado;
  } catch (error) {
    return false;
  }
}

async function notificarTerminacion(nombreEmpresa, cedula_juridica, Empleados) {
    for (const Empleado of Empleados) {
    const datos = {
      nombre: Empleado.nombre_completo,
      nombreEmpresa: nombreEmpresa,
    };
    CorreoServicio.enviarCorreo(plantilla, datos, Empleado.correo, `Terminacion de ${nombreEmpresa}`);
  }
}

module.exports = {
  editarEmpresa,
  borrarEmpresa,
};
