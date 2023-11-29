const SolicitudModelo = require('../../../models/solicitudModel/solicitudModel');
const BitacoraLibres = require('../../../models/bitacoraModelo/bitacoraLibresModelo');
const LibresModelo = require('../../../models/libresModel/libresModel');
const Servicio = require('../../../servicios/reportesServicios/reportesEmpleadorServicios/reportesEmpleadorServicios');

const {datosPruebaSolicitudesAprobadas, datosPruebaLibresPorPoliticaDeEmpresa,
        datosPruebaLibresPorEmpleadoPorPoliticaDeEmpresa, datosPruebaBitacoraLibres,
        datosEsperadosReporteDiasSolicitadosPorPolitica,
        datosEsperadosReporteDiasSolicitadosPorPoliticaVacio,
        datosEsperadosReporteDiasGastadosPorEmpleadoPorPolitica,
        datosEsperadosReporteDiasGastadosPorEmpleadoPorPoliticaVacio
    } = require('./datosPruebas');

jest.mock('../../../models/bitacoraModelo/bitacoraLibresModelo');
jest.mock('../../../models/solicitudModel/solicitudModel');
jest.mock('../../../models/libresModel/libresModel');

describe('Reportes Empleador', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Reporte de dias solicitados por política', () => {
        it('Se reciben los datos del reporte de forma correcta', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            SolicitudModelo.obtenerSolicitudesAprobadasPorEmpresa.mockResolvedValue(datosPruebaSolicitudesAprobadas);
            LibresModelo.obtenerLibresPorPoliticaPorEmpresa.mockResolvedValue(datosPruebaLibresPorPoliticaDeEmpresa);
    
            // Actuar
            const respuesta = await Servicio.obtenerInfoReporteDiasSolicitadosPorPolitica('cedula_empleado');
            
            // Afirmar
            expect(respuesta).toStrictEqual(datosEsperadosReporteDiasSolicitadosPorPolitica);
    
        })
    
        it('No hay informacion en la base de datos', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            SolicitudModelo.obtenerSolicitudesAprobadasPorEmpresa.mockResolvedValue([]);
            LibresModelo.obtenerLibresPorPoliticaPorEmpresa.mockResolvedValue([]);
    
            // Actuar
            const respuesta = await Servicio.obtenerInfoReporteDiasSolicitadosPorPolitica('cedula_empleado');
    
            // Afirmar
            expect(respuesta).toStrictEqual(datosEsperadosReporteDiasSolicitadosPorPoliticaVacio);
        })
    })
    
    describe('Reporte de dias generados por política', () => {
        it('Se reciben los datos del reporte de forma correcta', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            BitacoraLibres.obtenerTodosPorEmpresa.mockResolvedValue(datosPruebaBitacoraLibres);
    
            // Actuar
            const respuesta = await Servicio.obtenerInfoReporteDiasGeneradosPorPolitica('cedula_empleado');
    
            // Afirmar
            expect(respuesta).toStrictEqual(datosPruebaBitacoraLibres);
        });
    
        it('No hay informacion en la base de datos', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            BitacoraLibres.obtenerTodosPorEmpresa.mockResolvedValue([]);
    
            // Actuar
            const respuesta = await Servicio.obtenerInfoReporteDiasGeneradosPorPolitica('cedula_empleado');
    
            // Afirmar
            expect(respuesta).toStrictEqual([]);
        });
    });

    describe('Reporte de dias gastados', () => {
        it('Se reciben los datos del reporte de forma correcta', async () => {
            // Preparar
            // Se hacen los mocks
            SolicitudModelo.obtenerSolicitudesAprobadasPorEmpresa.mockResolvedValue(datosPruebaSolicitudesAprobadas);
            LibresModelo.obtenerLibresPorEmpresaReporte.mockResolvedValue(datosPruebaLibresPorEmpleadoPorPoliticaDeEmpresa);
    
            // Actuar
            const respuesta = await Servicio.obtenerSolicitudesPorEmpresaReporte('cedula_empleado');

            // Afirmar
            expect(respuesta).toStrictEqual(datosEsperadosReporteDiasGastadosPorEmpleadoPorPolitica);
        });

        it('No hay informacion en la base de datos', async () => {
            // Preparar
            // Se hacen mocks de las funciones utilizadas
            SolicitudModelo.obtenerSolicitudesAprobadasPorEmpresa.mockResolvedValue([]);
            LibresModelo.obtenerLibresPorEmpresaReporte.mockResolvedValue([]);
    
            // Actuar
            const respuesta = await Servicio.obtenerSolicitudesPorEmpresaReporte('cedula_empleado');

            // Afirmar
            expect(respuesta).toStrictEqual(datosEsperadosReporteDiasGastadosPorEmpleadoPorPoliticaVacio);
        });
    })
})