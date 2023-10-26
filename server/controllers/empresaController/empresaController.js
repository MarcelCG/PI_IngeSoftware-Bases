const Empresa = require('../../models/empresaModel/empresasModel');

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
      cedula_empleador,
      telefono1,
      telefono2,
      correo1,
      correo2
    } = req.body;

    // Llama a la función createPolitica que inserta en la tabla "Politica"
    const success = await Empresa.createEmpresa(
      cedula_juridica,
      nombre,
      cedula_empleador,
      telefono1,
      telefono2,
      correo1,
      correo2
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
    console.log('Se llega al controlador');
    try {
      const success = await Empresa.getEmpresaByCedulaEmpleador(cedula_empleador);
      console.log('Se pasa del modelo')
      if(success != null){
        res.status(200).json(success);
      } else {
        res.status(404).json({error: "Empresa no encontrada"});
      }
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

async function obtenerEmpresaPorCedulaEmpleado(req, res){
  const {cedula_empleado} = req.params;

    try {
      const success = await Empresa.obtenerEmpresaPorCedulaEmpleado(cedula_empleado);
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
    const [empresaData] = await Promise.all([
      Empresa.getEmpresaByCedula(empresa)
    ]);

    if (empresaData) {
      const empresaInfo = {
        ...empresaData,
      };
      console.log(empresaInfo)
      res.status(200).json({ data: empresaInfo });
    } else {
      res.status(404).json({ error: 'Empresa no encontrada' });
    }
  } catch (error) {
    console.error('Error al cargar datos de la empresa:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}


module.exports = {
  getAllEmpresas,
  createEmpresa,
  getEmpresaByCedula,
  getEmpresaByCedulaEmpleador,
  getEmpresaInfo,
  obtenerEmpresaPorCedulaEmpleado,
};
