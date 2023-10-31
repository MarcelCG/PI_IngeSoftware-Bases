const sql = require('mssql');
const { aprobarSolicitud, rechazarSolicitud } = require('../../models/solicitudModel/solicitudModel');

jest.mock('mssql');

describe('Test de funciones de solicitud', () => {
  it('debería aprobar una solicitud', async () => {
    //Preparar
    const pool = {
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnValue({ rowsAffected: [1] }),
    };

    const mockConnect = jest.fn().mockResolvedValue(pool);
    sql.connect = mockConnect;

    //Actuar
    const result = await aprobarSolicitud(123, 'Aprobada', pool);

    //Afirmar
    expect(result).toBe(true);
  });

  it('debería rechazar una solicitud', async () => {
    //Preparar
    const pool = {
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnValue({ rowsAffected: [0] }),
    };

    //Actuar
    const mockConnect = jest.fn().mockResolvedValue(pool);
    sql.connect = mockConnect;

    //Afirmar
    const result = await rechazarSolicitud(456, 'Rechazada', pool);
    expect(result).toBe(false);
  });
});
