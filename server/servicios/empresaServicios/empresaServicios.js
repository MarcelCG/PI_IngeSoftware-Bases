const express = require('express');
const router = express.Router();
const EmpresaModel = require('../../models/empresaModel/empresasModel');

async function editarEmpresa(empresa) {
  const estadoEdicion = await EmpresaModel.editarEmpresa(empresa);
  return estadoEdicion;
};

module.exports = {
  editarEmpresa
};
