const express = require('express');
const router = express.Router();
const LibModel = require('../../models/libresModel/libresModel');
const PolModel = require('../../models/politicaModel/politicasModel');
const EmpleModel = require('../../models/usuarioModel/Empleado/empleadoModel');
const BitLibModel = require('../../models/bitacoraLibreModel/bitacoraLibresModel');
const PoliticaServicios = require('../politicaServicios/politicaServicios');
const EmpleadoServicios = require('../usuarioServicios/empleadoServicios/empleadoServicios');

async function actualizarTodos(cedula_empresa) {
  let estado = -1;

  // se llama al modelo para traer los datos con los que se van a trabajar
  try {

    const [Empleados, Libres, Politicas] = await Promise.all([
      EmpleModel.getAllByEmpresa(cedula_empresa),
      LibModel.obtenerPorEmpresa(cedula_empresa),
      PolModel.getByCedulaEmpresa(cedula_empresa),
    ]);
    // se filtran las politicas vigentes
    const politicasVigentes = Politicas.filter(pol => PoliticaServicios.vigente(pol));
    // Se asignan las fechas de donde a donde se van a calcular los nuevos dias
    const Hoy = new Date();
    // filtra que el exista un empleado relacionado al libre 
    const LibresSinActualizar = Libres.filter(lib => sinActualizar(lib, Hoy) && Empleados.find(Emple => Emple.cedula === lib.cedula_empleado));
    const nuevosDias = calcularTiempos(politicasVigentes, LibresSinActualizar, Empleados, Hoy);
    // se verifica que el numero de dias asignados no se salga del limite de DECIMAL(5,2) de la BD
    verificarMaximo(nuevosDias);
    // se mandan los nuevos tiempos a la BD

    estado = await LibModel.actualizarTodos(nuevosDias, cedula_empresa);
    const nuevaFecha = new Date('2020-1-1');
    estado = await BitLibModel.agregarBitacorasLIB(nuevosDias, cedula_empresa, nuevaFecha);
    if (nuevosDias !== undefined) {
      return nuevosDias;
    } else {
      return estado;
    }
  } catch (error) {
    console.error("Error al Actualizar", error);
    return estado;
  }
}

function Gauss(n) {
  if (n < 1) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};

function verificarMaximo(libres) {
  // Número más grande que permite DECIMAL(5,2) en MySQL
  const maximoDecimal = 999.99;
  libres.forEach(lib => {
    if (lib.dias_libres_disponibles > maximoDecimal) {
      lib.dias_libres_disponibles = maximoDecimal;
    }
  });
};

// Toma un arreglo de fechas y devuelve la fecha MIN o MAX dependiendo de la opcion
function FechaMinMax(arregloFechas, obtenerMax) {
  if (obtenerMax === true) {
    return new Date(Math.max.apply(null, arregloFechas));
  } else {
    return new Date(Math.min.apply(null, arregloFechas));
  }
};

function sinActualizar(Libre, Hoy) {
  if (Libre.ultima_actualizacion !== null) {

    const ultimaAct = new Date(Libre.ultima_actualizacion);
    const mesUltimaAct = ultimaAct.getMonth();
    const anhoUltimaAct = ultimaAct.getFullYear();
    const mes = Hoy.getMonth();
    const anio = Hoy.getFullYear();

    return !(mesUltimaAct === mes && anhoUltimaAct === anio);
  }
  else{
    return true;
  }
};

function iniciarValores(Empleados, lib, pol, Hoy){
  // obtener la fecha de contratacion del empleaod asociado al libre
  const fechaContratacion = EmpleadoServicios.obtenerFechaContrato(Empleados,lib.cedula_empleado);
  if (fechaContratacion === null) {
    return null;
  }
  // obtiene la fecha Menor
  const maxFecha = FechaMinMax([pol.fecha_final, Hoy], false);
  // obtiene la fecha Menor
  const inicioVigencia = FechaMinMax([pol.fecha_inicio, fechaContratacion], true); 
  // obtien la ultima vez que se actualizo la fecha
  const ultimaActua = (lib.ultima_actualizacion === null) ? inicioVigencia : new Date(lib.ultima_actualizacion);

  return {maxFecha, inicioVigencia, ultimaActua};
};

function asignarDias(lib, inicioVigencia, ultimaActua, maxFecha, pol){
  // cant. de periodos que han pasado desde la ultima actualizacion
  const milisegDia = 86400000;
  const periodosHastaUltima = (lib.ultima_actualizacion !== null) ?
    (((ultimaActua - inicioVigencia) / milisegDia) / pol.periodo).toFixed(2) : 0;
  // cant. de periodos totales que han pasado desde el Inicio de la vigencia
  const periodosTotales = (((maxFecha - inicioVigencia) / milisegDia) / pol.periodo).toFixed(2);
  // cant. de periodos desde la ultima actualizacion
  const periodosDesdeUltima = periodosTotales - periodosHastaUltima;
  // dias nuevos [los no incrementativos]
  let diasNuevos = (pol.acumulativo === true) ?
    (periodosDesdeUltima * pol.dias_a_dar + lib.dias_libres_disponibles) :
    (periodosDesdeUltima >= 1) ? // IF al menos ha pasado un Periodo
    pol.dias_a_dar : (periodosDesdeUltima * pol.dias_a_dar);
  // dias nuevos [incrementativos]
  if (pol.incrementativo === true) {
    const incrementoTotal = Gauss(Math.round(periodosTotales));
    const incrementoDesdeUltima = Gauss(Math.round(periodosHastaUltima));
    diasNuevos += pol.dias_a_incrementar *
      (incrementoTotal - (lib.ultima_actualizacion === null ? 0 : incrementoDesdeUltima));
  }
  return diasNuevos;
};


function calcularTiempos(PoliticasVigentes, LibresSinActualizar, Empleados, Hoy) {
  const nuevosDias = [];

  PoliticasVigentes.forEach(pol => {
    pol.fecha_final = new Date(pol.fecha_final);
    pol.fecha_inicio = new Date(pol.fecha_inicio);
    LibresSinActualizar.filter(lib => lib.titulo_politica === pol.titulo).forEach(lib => {

      const { maxFecha, inicioVigencia, ultimaActua } = iniciarValores(Empleados, lib, pol, Hoy);
      const diasNuevos = Number(asignarDias(lib, inicioVigencia, ultimaActua, maxFecha, pol)).toFixed(2);

      const libre = {
        cedula_empleado: lib.cedula_empleado,
        titulo_politica: lib.titulo_politica,
        dias_libres_disponibles: diasNuevos,
        ultima_actualizacion: Hoy.toISOString().slice(0, 10),
        nuevos_libres: Math.abs(diasNuevos - lib.dias_libres_disponibles).toFixed(2)
      };
      nuevosDias.push(libre);
    });
  });
  return nuevosDias;
};

async function obtenerInfoLibresPorPolitica(cedula) {
  try {
    const politicas = await LibModel.obtenerInfoLibresPorPolitica(cedula);
    return politicas;
  } catch (error) {
    console.error("Error al encontrar los dias libres por politica", error);
    return error;
  }
}

module.exports = {
  actualizarTodos,
  calcularTiempos,
  obtenerInfoLibresPorPolitica
};


