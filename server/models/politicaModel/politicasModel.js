const sql = require('mssql');
const dbConfig = require('../../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todas las Politicas
async function getAll(cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Politica WHERE cedula_empresa = @cedula_empresa');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}

async function createPolitica(
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
  descripcion
) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('titulo', sql.NVarChar, titulo)
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .input('periodo', sql.Decimal(5, 2), periodo)
      .input('fecha_inicio', sql.Date, fecha_inicio)
      .input('fecha_final', sql.Date, fecha_final)
      .input('inicia_desde_contrato', sql.Bit, inicia_desde_contrato)
      .input('dias_a_dar', sql.Decimal(5, 2), dias_a_dar)
      .input('incrementativo', sql.Bit, incrementativo)
      .input('dias_a_incrementar', sql.Decimal(5,2), dias_a_incrementar)
      .input('acumulativo', sql.Bit, acumulativo)
      .input('activo', sql.Bit, activo)
      .input('descripcion', sql.NVarChar, descripcion)
      .query(
        `INSERT INTO Politica (
          titulo, cedula_empresa, periodo, fecha_inicio, fecha_final,
          inicia_desde_contrato, dias_a_dar, incrementativo, dias_a_incrementar, 
          acumulativo, activo, descripcion
        )
        VALUES (
          @titulo, @cedula_empresa, @periodo, @fecha_inicio, @fecha_final,
          @inicia_desde_contrato, @dias_a_dar, @incrementativo, @dias_a_incrementar,
          @acumulativo, @activo, @descripcion
        )`
      );
    return result.rowsAffected.some(count => count > 0);
  } catch (error) {
    throw error;
  }
}

// Función para obtener una política por su título
async function getByTitulo(titulo) {
  console.log(titulo);
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('titulo', sql.NVarChar, titulo)
      .query('SELECT * FROM Politica WHERE titulo = @titulo');
    if (result.recordset.length > 0) {
      // Si se encontró una política con ese título, la retornamos
      return result.recordset[0];
    } else {
      // Si no se encontró ninguna política con ese título, retornamos null
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function getByCedulaEmpresa(cedula_empresa) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .query('SELECT * FROM Politica WHERE cedula_empresa = @cedula_empresa AND activo = 1');

    return result.recordset;
  } catch (error) {
    throw error;
  }
}

async function getByTituloAndCedula(titulo, cedula_empresa) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('titulo', sql.NVarChar, titulo)
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .query('SELECT * FROM Politica WHERE titulo = @titulo AND cedula_empresa = @cedula_empresa');
    if (result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

//Funcion que realiza la consulta a la base de datos.
async function borrarPolitica(titulo,cedula_empresa) {
  let consultaExitosa=false;
  try {
    //Se trata de establecer la conexion y hacer la consulta.
    const exito = await sql.connect(dbConfig);
    const resultado = await exito
      .request()
      .input('tituloConsulta', sql.NVarChar, titulo)
      .input('cedula_empresaConsulta', sql.NVarChar, cedula_empresa)
      .query('EXEC BorrarPolitica @titulo=@tituloConsulta ,@cedula_empresa=@cedula_empresaConsulta');
    //Se devuelve al cantidad de lineas modificadas
    consultaExitosa=true;
    return consultaExitosa;
    //En caso de no poder establecer la conexion devuelve el error.
  } catch (error) {
    throw error;
  }
}
// Función para actualizar una política por su título (Mediante función almancenada en la base de datos)
async function editarPolitica(titulo, cedula_empresa ,actualizarDatosPolitica) {
  try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
          .request()
          .input("titulo", sql.NVarChar, titulo)
          .input("titulo_nuevo", sql.NVarChar, actualizarDatosPolitica.titulo)
          .input("cedula_empresa", sql.NVarChar,cedula_empresa)
          .input("periodo", sql.Decimal(5, 2), actualizarDatosPolitica.periodo)
          .input("fecha_final", sql.Date, actualizarDatosPolitica.fecha_final)
          .input("dias_a_dar", sql.Decimal(5, 2), actualizarDatosPolitica.dias_a_dar)
          .input("incrementativo", sql.Bit, actualizarDatosPolitica.incrementativo)
          .input("dias_a_incrementar", sql.Decimal(5, 2), actualizarDatosPolitica.dias_a_incrementar)
          .input("acumulativo", sql.Bit, actualizarDatosPolitica.acumulativo)
          .input("activo", sql.Bit, actualizarDatosPolitica.activo)
          .input("descripcion", sql.NVarChar, actualizarDatosPolitica.descripcion)
          .execute("ActualizarPolitica");

      return result.rowsAffected > 0;
  } catch (error) {
      throw error;
  }
}


module.exports = {
  getAll,
  createPolitica,
  getByTitulo,
  getByCedulaEmpresa,
  getByTituloAndCedula,
  borrarPolitica,
  editarPolitica,
};