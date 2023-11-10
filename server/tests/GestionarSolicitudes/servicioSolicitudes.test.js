const Solicitud = require('../../models/solicitudModel/solicitudModel');
const Empleado = require('../../models/usuarioModel/Empleado/empleadoModel')
const Servicio = require('../../servicios/solicitudServicios/solicitudServicios')

// Mock del módulo Solicitud
jest.mock('../../models/solicitudModel/solicitudModel');

jest.mock('../../models/usuarioModel/Empleado/empleadoModel');

describe('solicitudModel', () => {
  describe('aprobarSolicitud', () => {
    it('Manejar aprobación una solicitud existente', async () => {
      //Preparar
      // Mockear getSolicitudById para que devuelva una solicitud simulada
      Solicitud.getSolicitudById.mockResolvedValue({ id: 1, estado: 'Pendiente' });

      // Mockear aprobarSolicitud para que devuelva un resultado simulado
      Solicitud.aprobarSolicitud.mockResolvedValue(true);

      Empleado.getByCedulaAndEmpresa.mockResolvedValue({nombre: 'Jhon', correo1: 'jhon123@gmail.com'});

      const id = 1;

      //Actuar
      const result = await Servicio.aprobarSolicitud(id);

      //Afirmar
      expect(result).toBe(true);
    });

    it('Manejar la aprobación de una solicitud inexistente', async () => {
      //Preparar
      // Mockear getSolicitudById para que devuelva null para una solicitud inexistente
      Solicitud.getSolicitudById.mockResolvedValue(null);

      const id = 999; // ID inexistente

      //Actuar
      const result = await Servicio.aprobarSolicitud(id);

      //Afirmar
      expect(result).toBe(false);
    });
  });

  describe('rechazarSolicitud', () => {
    it('Manejar rechazo una solicitud existente', async () => {
      //Preparar
      // Mockear getSolicitudById para que devuelva una solicitud simulada
      Solicitud.getSolicitudById.mockResolvedValue({ id: 1, estado: 'Pendiente' });

      // Mockear aprobarSolicitud para que devuelva un resultado simulado
      Solicitud.rechazarSolicitud.mockResolvedValue(true);

      Empleado.getByCedulaAndEmpresa.mockResolvedValue({nombre: 'Jhon', correo1: 'jhon123@gmail.com'});

      const id = 1;

      //Actuar
      const result = await Servicio.rechazarSolictud(id);

      //Afirmar
      expect(result).toBe(true);
    });

    it('Manejar el rechazo de una solicitud inexistente', async () => {
      //Preparar
      // Mockear getSolicitudById para que devuelva null para una solicitud inexistente
      Solicitud.getSolicitudById.mockResolvedValue(null);

      const id = 999; // ID inexistente

      //Actuar
      const result = await Servicio.rechazarSolictud(id);

      //Afirmar
      expect(result).toBe(false);
    });
  });
});
