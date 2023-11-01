const express = require('express');
const router = express.Router();
const CorreoServicio = require('../correoServicios/correoServicios');
const EmpresaModel = require('../../models/empresaModel/empresasModel');
const EmpleModel = require('../../models/usuarioModel/Empleado/empleadoModel');


async function editarEmpresa(empresa) {
  const estadoEdicion = await EmpresaModel.editarEmpresa(empresa);
  return estadoEdicion;
};

async function borrarEmpresa(cedula_juridica) {
  const Empleados = await EmpleModel.getAllByEmpresa(cedula_empresa);
  const estado = await EmpresaModel.borrarEmpresa(cedula_juridica);
  if (estado === true) {

  }
  return estado;
};


//plantillaHTML, datos, direccion, asunto
async function enviarCorreoTerminacion(cedula_juridica, Empleados){
  for (var i = 0; i < Empleados; ++i) {
    CorreoServicio.enviarCorreo(plantillaHTML, datos, direccion, asunto);
  }

};

module.exports = {
  editarEmpresa,
  borrarEmpresa
};
