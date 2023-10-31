const express = require('express');
const router = express.Router();
const EmpresaModel = require('../../models/empresaModel/empresasModel');

async function editarEmpresa(empresa) {
  const estadoEdicion = await EmpresaModel.editarEmpresa(empresa);
  return estadoEdicion;
};

async function borrarEmpresa(cedula_juridica) {
/* const estadoEdicion = await EmpresaModel.borrarEmpresa(cedula_juridica);
   empleados = EmpleadoModel.getallbyEmpresa(cedula_juridica)
   politica = PoliticasModel.getallbyEmpresa(cedula_juridica)
   libre = libre.getAllByEmpresa(cedula_juridica)

   for all politicas
    politica.borrar(empleado.cedula_empleado)

   for all empleados
    empleado.borrar(empleado.cedula_empleado)

    al final, borrarEmpresa [este me toca a mi]

  */
  return estadoEdicion;
};


module.exports = {
  editarEmpresa,
  borrarEmpresa
};
