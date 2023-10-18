const Empresa = require('../../models/empresaModel/empresasModel');
const EmpresaCorreo = require('../../models/empresaModel/correosEmpresasModel');
const EmpresaTel = require('../../models/empresaModel/telefonosEmpresaModel');

// Obtener todas las empresas
async function getAllEmpresas(req, res) {
  try {
    const empresas = await Empresa.getAll();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear una nueva políticaa
async function createEmpresa(req, res) {
  try {
    const {
      cedula_juridica,
      nombre,
      cedula_empleador
    } = req.body;

    // Llama a la función createPolitica que inserta en la tabla "Politica"
    const success = await Empresa.createEmpresa(
     cedula_juridica,
      nombre,
      cedula_empleador
    );

    if (success) {
      res.status(201).json({ message: 'added Empresa' });
    } else {
      res.status(500).json({ message: 'Error adding empresa' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEmpresaByCedula(req, res){
  const {cedula_juridica} = req.params;
  console.log("cedula juridia: ", cedula_juridica);

  try {
    const success = await Empresa.getEmpresaByCedula(cedula_juridica);

    if(success != null){
      res.status(200).json(success);
    } else {
      res.status(404).json({error: "Empresa no encontrada"});
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function getEmpresaByCedulaEmpleador(req, res){
  const {cedula_empleador} = req.params;

    try {
      const success = await Empresa.getEmpresaByCedulaEmpleador(cedula_empleador);
      if(success != null){
        res.status(200).json(success);
      } else {
        res.status(404).json({error: "Empresa no encontrada"});
      }
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

async function getEmpresaInfo(req, res) {
  try {
    const { empresa } = req.params;
    const [empresaData, empresaCorreoData, empresaTelData] = await Promise.all([
      Empresa.getEmpresaByCedula(empresa),
      EmpresaCorreo.getByEmpresa(empresa),
      EmpresaTel.getByEmpresa(empresa),
    ]);

    if (empresaData) {
      const empresaInfo = {
        ...empresaData,
        correo: empresaCorreoData,
        telefono: empresaTelData,
      };
      res.status(200).json({ data: empresaInfo });
    } else {
      res.status(404).json({ error: 'Empresa no encontrada' });
    }
  } catch (error) {
    console.error('Error al cargar datos de la empresa:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}


async function editarEmpresa(req, res) {
  try {
    const { cedula_juridica } = req.params; // Obtiene la cédula jurídica de la empresa a editar
    const nuevosDatosEmpresa = req.body; // Datos actualizados de la empresa

    // Verifica si existe una empresa con la cédula jurídica especificada
    const empresaExistente = await empresaModel.getEmpresaByCedula(cedula_juridica);

    if (empresaExistente) {
      // Llama a la función para actualizar la empresa
      const exito = await empresaModel.editarEmpresa(cedula_juridica, nuevosDatosEmpresa);

      if (exito) {
        res.status(200).json({ message: 'Empresa actualizada exitosamente' });
      } else {
        res.status(500).json({ message: 'No se pudo actualizar la empresa' });
      }
    } else {
      res.status(404).json({ error: 'Empresa no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllEmpresas,
  createEmpresa,
  getEmpresaByCedula,
  getEmpresaByCedulaEmpleador,
  getEmpresaInfo,
  editarEmpresa,
};
