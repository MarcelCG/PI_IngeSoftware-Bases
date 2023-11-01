const usuarioModelo = require('../../models/usuarioModel/usuariosModel');
const { editarPerfilEmpleador } = require('../../servicios/usuarioServicios/empleadorServicios/empleadorServicios');

// Mock del modelo para simular su comportamiento
jest.mock('../../models/usuarioModel/usuariosModel', () => {
  return {
    editarPerfilEmpleador: jest.fn().mockResolvedValue(true),
  };
});

describe('editarPerfilEmpleador', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería llamar al modelo con datos válidos', async () => {
    const solicitud = {
      body: {
        cedula: '1-2345-6789',
        nombre: 'Nombre',
        primer_apellido: 'Apellido1',
        segundo_apellido: 'Apellido2',
        telefono1: '123456',
        telefono2: '789123',
        correo1: 'correo1@example.com',
        correo2: 'correo2@example.com',
      },
    };

    const respuesta = await editarPerfilEmpleador(solicitud, {});

    expect(usuarioModelo.editarPerfilEmpleador).toHaveBeenCalledWith(
      '1-2345-6789',
      'Nombre',
      'Apellido1',
      'Apellido2',
      '123456',
      '789123',
      'correo1@example.com',
      'correo2@example.com'
    );

    expect(respuesta).toBe(true);
  });
});
