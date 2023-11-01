const express = require('express');
const router = express.Router();
const EmpresaModel = require('../../models/empresaModel/empresasModel');

async function editarEmpresa(empresa) {
  const estadoEdicion = await EmpresaModel.editarEmpresa(empresa);
  return estadoEdicion;
};

async function borrarEmpresa(cedula_juridica) {
  const estado = await EmpresaModel.borrarEmpresa(cedula_juridica);
  return estado;
};

module.exports = {
  editarEmpresa,
  borrarEmpresa
};
