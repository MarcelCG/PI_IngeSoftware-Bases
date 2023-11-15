const Politica = require('../../models/politicaModel/politicasModel');
const serviciosPolitica = require('../../servicios/politicaServicios/politicaServicios')

// Obtener todas las politicas
async function getAllPoliticas(req, res) {
  try {
    const {cedula_empresa} = req.body
    const politicas = await Politica.getAll(cedula_empresa);
    res.status(200).json(politicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear una nueva política
async function createPolitica(req, res) {
  try {
    const {
      titulo,
    cedula_empresa,
    periodo,
    fecha_inicio,
    fecha_final,
    inicia_desde_contrato,
    dias_a_dar,
    incrementativo,
    dias_a_incrementar,
    acumulativo,
    activo,
    descripcion,
    } = req.body;

    // Verifica si ya existe un título
    const tituloExists = await Politica.getByTitulo(titulo);

    if (tituloExists) {
      res.status(400).json({ error: 'El título ya existe' });
      return;
    }

    // Llama a la función createPolitica que inserta en la tabla "Politica"
    const success = await Politica.createPolitica(
      titulo,
    cedula_empresa,
    periodo,
    fecha_inicio,
    fecha_final,
    inicia_desde_contrato,
    dias_a_dar,
    incrementativo,
    dias_a_incrementar,
    acumulativo,
    activo,
    descripcion,
    );

    if (success) {
      res.status(201).json({ message: 'Política creada exitosamente' });
    } else {
      res.status(500).json({ message: 'No se pudo crear la política' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para obtener una política por su título
async function getPoliticaByTitulo(req, res) {
  try {
    const { titulo } = req.params; // Obtiene el título de los parámetros de la URL
    // Llama a la función getByTitulo en el modelo de Política
    const politica = await Politica.getByTitulo(titulo);

    if (politica !== null) {
      // Si se encontró una política con ese título, la retornamos
      res.status(200).json(politica);
    } else {
      // Si no se encontró ninguna política con ese título, respondemos con un mensaje de error
      res.status(404).json({ error: 'Política no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPoliticaByCedulaEmpresa(req, res) {
  try {
    const { cedula_empresa } = req.params;
    
    // Llama a la función que busca políticas por cedula_empresa
    const politicas = await Politica.getByCedulaEmpresa(cedula_empresa);

    if (politicas.length > 0) {
      res.status(200).json(politicas);
    } else {
      res.status(404).json({ message: 'No se encontraron políticas para esta cedula_empresa' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPoliticaByTituloAndCedula(req, res) {
  try {
    const { titulo, cedula_empresa } = req.params;

    // Llama a la función getPoliticaByTituloAndCedula en el modelo de Política
    const politica = await Politica.getByTituloAndCedula(titulo, cedula_empresa);

    if (politica !== null) {
      // Si se encontró una política con ese título y cédula de empresa, la retornamos
      res.status(200).json(politica);
    } else {
      // Si no se encontró ninguna política con esos criterios, respondemos con un mensaje de error
      res.status(404).json({ error: 'Política no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Funcion que verifica si existe la politica y llama al servicio de borrar politica
async function borrarPolitica(solicitud, respuesta) {
  try {
    const { titulo, cedula_empresa } = solicitud.body;
    // Llama a la función que verifica si existe la política
    const politicaEncontrada = await Politica.getByTituloAndCedula(titulo, cedula_empresa);
    // En caso de encontrarla, la trata de borrar
    if (politicaEncontrada) {
      const exito = await serviciosPolitica.borrarPolitica(titulo, cedula_empresa);
      if (exito){
        respuesta.status(200).json();
      } else{
        respuesta.status(500).json({error: 'No se pudo eliminar la política'});
      }
    } else {
      respuesta.status(404).json({ error: 'Política no encontrada' });
    }
  // En caso contrario, devuelve el error
  } catch (error) {
     respuesta.status(500).json({ error: error.message });
  }
}

async function editarPolitica(req, res) {
  try {
    const { titulo } = req.params; // Obtiene el título de la política a editar
    const actualizarDatosPolitica = req.body; // Datos actualizados de la política

    // Verifica si existe una política con el título especificado
    const politicaExistente = await Politica.getByTitulo(titulo);
    console.log (politicaExistente);

    if (politicaExistente) {
      // Llama a la función para actualizar la política
      const exito = await Politica.editarPolitica(titulo, actualizarDatosPolitica); // Cambia "editarPolitica" a "Politica.editarPolitica"

      if (exito) {
        res.status(200).json({ message: 'Política actualizada exitosamente' });
      } else {
        res.status(500).json({ message: 'No se pudo actualizar la política' });
      }
    } else {
      res.status(404).json({ error: 'Política no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Exporta la función editarPolitica
module.exports = {
  getAllPoliticas,
  createPolitica,
  getPoliticaByTitulo,
  getPoliticaByCedulaEmpresa,
  getPoliticaByTituloAndCedula,
  borrarPolitica,
  editarPolitica,
};