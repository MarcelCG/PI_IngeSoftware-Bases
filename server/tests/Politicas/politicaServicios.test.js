const Servicio = require('../../servicios/politicaServicios/politicaServicios');
const Politica = require('../../models/politicaModel/politicasModel');
const Empleador = require('../../models/usuarioModel/Empleador/empleadorModel');
const Correo = require('../../servicios/correoServicios/correoServicios');
const {NO_ENCONTRADO, SIN_MODIFICACIONES, EXITO} = require('../../config/constantes');

/// Mocks
// Mock del modelo
jest.mock('../../models/politicaModel/politicasModel');
jest.mock('../../models/usuarioModel/Empleador/empleadorModel');
jest.mock('../../servicios/correoServicios/correoServicios');

Empleador.getByEmpresa.mockResolvedValue({empleador: {
    nombre: 'Probador',
    empresa: 'Empresa',
    correo1: 'correo',
}});

Correo.enviarCorreo.mockResolvedValue();

// Datos de la politica
var titulo = 'Titulo Politica';
var cedulaEmpresa = '1-2345-6789';
var nuevosDatos = {titulo: 'Nuevo_Titulo'};

describe('Editar Politicas', () => {
    it('Se intenta editar una política que no existe', async () => {
        // Preparar
        // Mockear
        Politica.getByTituloAndCedula.mockResolvedValue(null);
        
        // Actuar
        const respuesta = await Servicio.editarPolitica(titulo, cedulaEmpresa, nuevosDatos);

        // Afirmar
        expect(respuesta).toBe(NO_ENCONTRADO);
    });
    it('Se intenta editar una política que existe, pero no se hacen cambios', async () => {
        // Preparar
        // Mockear
        Politica.getByTituloAndCedula.mockResolvedValue({titulo, cedulaEmpresa});
        Politica.editarPolitica.mockResolvedValue(false);

        // Actuar
        const respuesta = await Servicio.editarPolitica(titulo, cedulaEmpresa, nuevosDatos);

        // Afirmar
        expect(respuesta).toBe(SIN_MODIFICACIONES);
    });
    it('Se edita una politica correctamente', async () => {
        // Preparar
        // Mockear
        Politica.getByTituloAndCedula.mockResolvedValue({titulo, cedulaEmpresa});
        Politica.editarPolitica.mockResolvedValue(true);

        // Actuar
        const respuesta = await Servicio.editarPolitica(titulo, cedulaEmpresa, nuevosDatos);

        // Afirmar
        expect(respuesta).toBe(EXITO);
        expect(Correo.enviarCorreo).toHaveBeenCalled();
    });
}) 