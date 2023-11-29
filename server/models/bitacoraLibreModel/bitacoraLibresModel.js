const sql = require('mssql');
const dbConfig = require('../../config/dbconfig'); 

async function agregarBitacorasLIB(nuevosLibres, cedula_empresa) {
  try {
    if (!nuevosLibres || nuevosLibres.length === 0) {
      return 0;
    }
    const hoy = new Date();
    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    const valores = nuevosLibres.map(Lib => `(
      '${Lib.cedula_empleado}',
      '${Lib.titulo_politica}',
      '${cedula_empresa}',
      '${Lib.nuevos_libres}',
      '${hoy.toISOString().slice(0, 10)}',
      '${Lib.dias_libres_disponibles}'
    )` 
    );
    const query = `
      INSERT INTO bitacora_libres (
        cedula_empleado,
        titulo_politica,
        cedula_empresa,
        dias,
        fecha,
        total_actual
      )
      VALUES
        ${valores.join(', ')}
    `;
    const resultado = await request.query(query);
    return resultado;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    agregarBitacorasLIB
};
