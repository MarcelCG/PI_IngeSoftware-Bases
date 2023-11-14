const usuarioModelo = require('../../models/usuarioModel/usuariosModel');
const empleadoModelo = require('../../models/usuarioModel/Empleado/empleadoModel');
const { EditarUsuario } = require('../../servicios/usuarioServicios/empleadoServicios/editarEmpleadoServicios');

// Mock del modelo para simular su comportamiento
jest.mock('../../models/usuarioModel/usuariosModel');
jest.mock('../../models/usuarioModel/Empleado/empleadoModel');

describe('editar empleado', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería llamar al modelo con datos válidos', async () => {
    const solicitud = {
      body: {
        cedula: '1-2345-6789',
        contrasena: 'contrasena',
        nombre: 'Nombre',
        primer_apellido: 'Apellido1',
        segundo_apellido: 'Apellido2',
        telefono1: '123456',
        telefono2: '789123',
        correo1: 'correo1@example.com',
        correo2: 'correo2@example.com',
        rol: 'rol',
        fecha_contratacion: '2000-01-01',
        bool: true,
      },
    };

    usuarioModelo.editarUsuario.mockResolvedValue(true);
    empleadoModelo.editarEmpleado.mockResolvedValue(true);

    const respuesta = await EditarUsuario(solicitud, {});

    expect(usuarioModelo.editarUsuario).toHaveBeenCalledWith(
      '1-2345-6789',
      'contrasena',
      'Nombre',
      'Apellido1',
      'Apellido2',
      '123456',
      '789123',
      'correo1@example.com',
      'correo2@example.com',
      true,
    );

    expect(respuesta).toBe(2);
  });
});