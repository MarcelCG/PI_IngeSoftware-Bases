const sql = require('mssql');
const dbConfig = require('../../../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todos los empleados
async function getAll() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
                    .query('SELECT u.cedula,'
                        + ' CONCAT(u.nombre, \' \', u.primer_apellido, \' \', u.segundo_apellido)'
                        + ' AS nombre_completo,'
                        + ' c.correo,'
                        + ' e.rol,'
                        + ' e.fecha_contratacion'
                        + ' FROM Usuario u, Empleado e, CorreosUsuarios c '
                        + ' WHERE u.cedula=e.cedula_empleado'
                        + ' AND u.activo=1'
                        + ' AND c.cedula_usuario=u.cedula');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}

// Obtener todos los empleados por empresa
async function getAllByEmpresa(cedula_empresa) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
                  .input('cedula_empresa', sql.NVarChar, cedula_empresa)
                  .query('SELECT u.cedula,'
                      + ' CONCAT(u.nombre, \' \', u.primer_apellido, \' \', u.segundo_apellido)'
                      + ' AS nombre_completo,'
                      + ' u.correo1 AS \'correo\','
                      + ' e.rol,'
                      + ' e.fecha_contratacion'
                      + ' FROM Usuario u, Empleado e'
                      + ' WHERE u.cedula=e.cedula_empleado'
                      + ' AND u.activo=1'
                      + ' AND e.cedula_empresa = @cedula_empresa');
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// Definir el modelo para la tabla Empleado
async function createEmpleado(
  cedula_empleado,
  cedula_empresa,
  rol,
  fecha_contratacion
) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_empleado', sql.NVarChar, cedula_empleado)
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .input('rol', sql.NVarChar, rol)
      .input('fecha_contratacion', sql.Date, fecha_contratacion)
      .query(
        `INSERT INTO Empleado (
          cedula_empleado, cedula_empresa, rol, fecha_contratacion
        )
        VALUES (
          @cedula_empleado, @cedula_empresa, @rol, @fecha_contratacion
        )`
      );
    return result.rowsAffected > 0;
  } catch (error) {
    throw error;
  }
}

// Función para obtener un empleado por su cedula
async function getByCedula(cedula_empleado) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .query('SELECT * FROM Empleado WHERE cedula_empleado = @cedula_empleado');
      if (result.recordset.length > 0) {
        // Si se encontró un empleado, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ningun empleado, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Función para obtener un empleado por su empresa
async function getByEmpresa(cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empresa', sql.NVarChar, cedula_empresa)
        .query('SELECT * FROM Empleado WHERE cedula_empresa = @cedula_empresa');
      if (result.recordset.length > 0) {
        // Si se encontró un empleado, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ningun empleado, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Función para obtener un empleado por su empresa
async function getByCedulaAndEmpresa(cedula_empleado, cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .input('cedula_empresa', sql.NVarChar, cedula_empresa)
        .query('EXEC obtenerDatosEmpleado @cedula_empleado, @cedula_empresa');
      if (result.recordset.length > 0) {
        // Si se encontró un empleado, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ningun empleado, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async function getEmpleadoByCedulaYEmpresa(cedulaEmpleado, cedulaEmpresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedulaEmpleado', sql.NVarChar, cedulaEmpleado)
        .input('cedulaEmpresa', sql.NVarChar, cedulaEmpresa)
        .query(`
          SELECT U.nombre, U.primer_apellido, U.segundo_apellido, EU.telefono, E.fecha_contratacion, E.rol
          FROM Empleado E
          INNER JOIN Usuario U ON E.cedula_empleado = U.cedula
          LEFT JOIN TelefonosUsuarios EU ON U.cedula = EU.cedula_usuario
          WHERE E.cedula_empleado = @cedulaEmpleado
            AND E.cedula_empresa = @cedulaEmpresa
        `);
        
      if (result.recordset.length > 0) {
        // Si se encontró un empleado, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ningún empleado, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async function editarEmpleado(
    cedula_empleado,
    rol,
    fecha_contratacion
  ) {
    try {
      const pool = await sql.connect(dbConfig);
      const resultado = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .input('rol', sql.NVarChar, rol)
        .input('fecha_contratacion', sql.Date, fecha_contratacion)
        .query(
          `UPDATE Empleado 
          SET 
            cedula_empleado=@cedula_empleado,
            rol=@rol,
            fecha_contratacion=@fecha_contratacion
          WHERE 
            cedula_empleado=@cedula_empleado`
        );
      return resultado.rowsAffected > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  //Funcion que devuelve los correos de los empleados que tienen una politica vigente
  async function correoEmpleadosPorPolitica(titulo, cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('tituloPolitica', sql.NVarChar, titulo)
        .input('cedulaEmpresa', sql.NVarChar, cedula_empresa)
        .query(`SELECT DISTINCT u.correo1 
                FROM Usuario u 
                INNER JOIN Libres l ON u.cedula = l.cedula_empleado 
                WHERE l.titulo_politica = @tituloPolitica AND l.cedula_empresa = @cedulaEmpresa`);
  
      if (result.recordset.length > 0) {
        const correos = result.recordset.map((row) => row.correo1);
        return correos;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
  
  async function borrarEmpleado(cedulaEmpleado) {
    let consulta_exitosa = null;
    try {
      const exito = await sql.connect(dbConfig);
      const resultado = await exito
        .request()
        .input('cedula_empleadoConsulta', sql.NVarChar, cedulaEmpleado)
        .query('EXEC BorrarEmpleado @cedula_empleado=@cedula_empleadoConsulta');
    
      consulta_exitosa= 5;
      return consulta_exitosa;
    } catch (error) {
      // Manejar errores
      console.error("Error al ejecutar la consulta:", error);
      return consulta_exitosa;
    }
  }
  async function correoEmpleado(cedula_empleado) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedulaEmpleadoConsulta', sql.NVarChar, cedula_empleado)
        .query(`SELECT correo1
                FROM Usuario
                WHERE cedula = @cedulaEmpleadoConsulta`);
  
      if (result.recordset.length > 0) {
        const correos = result.recordset.map((row) => row.correo1);
        return correos;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

// Exportar el modelo
module.exports = {
  getAll,
  getAllByEmpresa,
  createEmpleado,
  getByCedula,
  getByEmpresa,
  getByCedulaAndEmpresa,
  getEmpleadoByCedulaYEmpresa,
  borrarEmpleado,
  correoEmpleado,
  editarEmpleado,
  correoEmpleadosPorPolitica
};
