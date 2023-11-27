const Solicitud = require('../../../models/solicitudModel/solicitudModel');
const BitacoraLibres = require('../../../models/bitacoraModelo/bitacoraLibresModelo');
const Servicio = require('../../../servicios/reportesServicios/reportesEmpleadoServicios/reportesEmpleadoServicios');

const {datosPruebaRepAcumulados, datosEsperadosRepAcumulados,
    datosPruebaRepUsados, datosEsperadosRepUsados} = require('./datosPruebas');

jest.mock('../../../models/bitacoraModelo/bitacoraLibresModelo');
jest.mock('../../../models/solicitudModel/solicitudModel');

describe('Reportes Empleado', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Reporte de dias usados', () => {
        it('Se reciben los datos del reporte de forma correcta', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            Solicitud.getSolicitudByCedula.mockResolvedValue(datosPruebaRepUsados);
    
            const fechaMock = new Date('2023-11-27T12:00:00');
            jest.spyOn(global, 'Date').mockImplementation(() => fechaMock);
    
            // Actuar
            const respuesta = await Servicio.reporteDiasUsados('cedula_empleado');
    
            // Afirmar
            expect(respuesta).toStrictEqual(datosEsperadosRepUsados);
    
            // Restaura el mock para evitar riesgos
            global.Date.mockRestore();
        })
    
        it('No se han aprobado solicitudes', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            Solicitud.getSolicitudByCedula.mockResolvedValue([]);
    
            // Actuar
            const respuesta = await Servicio.reporteDiasUsados('cedula_empleado');
    
            // Afirmar
            expect(respuesta).toStrictEqual([]);
        })
    })
    
    describe('Reporte de dias acumulados', () => {
        it('Se reciben los datos del reporte de forma correcta', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            BitacoraLibres.obtenerTodosPorEmpleado.mockResolvedValue(datosPruebaRepAcumulados);
    
            // Actuar
            const respuesta = await Servicio.reporteDiasAcumulados('cedula_empleado');
    
            // Afirmar
            expect(respuesta).toStrictEqual(datosEsperadosRepAcumulados);
        });
    
        it('No se han acumulado dias', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            BitacoraLibres.obtenerTodosPorEmpleado.mockResolvedValue([]);
    
            // Actuar
            const respuesta = await Servicio.reporteDiasAcumulados('cedula_empleado');
    
            // Afirmar
            expect(respuesta).toStrictEqual([]);
        });
    })
})