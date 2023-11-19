const express = require('express');
const router = express.Router();
const LibModel = require('../../models/libresModel/libresModel');
const PolModel = require('../../models/politicaModel/politicasModel');
const EmpleModel = require('../../models/usuarioModel/Empleado/empleadoModel');
const PoliticaServicios = require('../politicaServicios/politicaServicios');
const EmpleadoServicios = require('../usuarioServicios/empleadoServicios/empleadoServicios');

let Hoy;
const milisegDia = 86400000;

async function actualizarTodos(cedula_empresa) {
  const estado = -1;
  try {
    const [Empleados, Libres, Politicas] = await Promise.all([
      EmpleModel.getAllByEmpresa(cedula_empresa),
      LibModel.obtenerPorEmpresa(cedula_empresa),
      PolModel.getByCedulaEmpresa(cedula_empresa),
    ]);

    const politicasVigentes = Politicas.filter(pol => PoliticaServicios.vigente(pol));

    Hoy = new Date();
    // filtra que el exista un empleado relacionado al libre 
    const LibresSinActualizar = Libres.filter(lib => sinActualizar(lib) && Empleados.find(Emple => Emple.cedula === lib.cedula_empleado));
    const nuevosDias = calcularTiempos(politicasVigentes, LibresSinActualizar, Empleados);
    console.log(nuevosDias);
    // const cantEmpleados = new Set(nuevosDias.map(lib => lib.cedula_empleado)).size;
    // verificarMaximo(nuevosDias);

    await LibModel.actualizarTodos(nuevosDias, cedula_empresa);
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

function FechaMinMax(arregloFechas, obtenerMax) {
  if (obtenerMax === true) {
    return new Date(Math.max.apply(null, arregloFechas));
  } else {
    return new Date(Math.min.apply(null, arregloFechas));
  }
};

function sinActualizar(Libre) {
  if (Libre.ultima_actualizacion !== null) {
    const ultimaAct = new Date(Libre.ultima_actualizacion);
    const mesUltimaAct = ultimaAct.getMonth();
    const anhoUltimaAct = ultimaAct.getFullYear();
    const mes = Hoy.getMonth();
    const anio = Hoy.getFullYear();
    const varible = (mesUltimaAct === mes && anhoUltimaAct === anio);
    return !(mesUltimaAct === mes && anhoUltimaAct === anio);
  }
  else{
    return true;
  }
};

function iniciarValores(Empleados, lib, pol){
  const fechaContratacion = EmpleadoServicios.obtenerFechaContrato(Empleados,lib.cedula_empleado);
  if (fechaContratacion === null) {
    return null;
  }
  const maxFecha = FechaMinMax([pol.fecha_final, Hoy], false);
  const inicioVigencia = FechaMinMax([pol.fecha_inicio, fechaContratacion], true);
  const ultimaActua = (lib.ultima_actualizacion === null) ? inicioVigencia : new Date(lib.ultima_actualizacion);
  return {maxFecha, inicioVigencia, ultimaActua};

};

function asignarDias(lib, inicioVigencia, ultimaActua, maxFecha, pol){
  const periodosHastaUltima = (lib.ultima_actualizacion !== null) ?
    (((ultimaActua - inicioVigencia) / milisegDia) / pol.periodo).toFixed(2) : 0;
  const periodosTotales = (((maxFecha - inicioVigencia) / milisegDia) / pol.periodo).toFixed(2);
  const periodosDesdeUltima = periodosTotales - periodosHastaUltima;
  let diasNuevos = (pol.acumulativo === true) ?
    (periodosDesdeUltima * pol.dias_a_dar + lib.dias_libres_disponibles) :
    (periodosDesdeUltima >= 1) ? // si al menos ha pasado un Periodo
    pol.dias_a_dar : (periodosDesdeUltima * pol.dias_a_dar);

  if (pol.incrementativo === true) {
    const incrementoTotal = Gauss(Math.round(periodosTotales));
    const incrementoDesdeUltima = Gauss(Math.round(periodosHastaUltima));
    diasNuevos += pol.dias_a_incrementar *
      (incrementoTotal - (lib.ultima_actualizacion === null ? 0 : incrementoDesdeUltima));
  }
  return diasNuevos;
};


function calcularTiempos(PoliticasVigentes, LibresSinActualizar, Empleados) {
  const nuevosDias = [];
  const haceUnMes = new Date(Hoy);
  haceUnMes.setMonth(Hoy.getMonth() - 1);
  PoliticasVigentes.forEach(pol => {
    pol.fecha_final = new Date(pol.fecha_final);
    pol.fecha_inicio = new Date(pol.fecha_inicio);
    LibresSinActualizar.filter(lib => lib.titulo_politica === pol.titulo ).forEach(lib => {
      
      const { maxFecha, inicioVigencia, ultimaActua } = iniciarValores(Empleados, lib, pol);

      const diasNuevos = asignarDias(lib, inicioVigencia, ultimaActua, maxFecha, pol);

      const libre = {
        cedula_empleado: lib.cedula_empleado,
        titulo_politica: lib.titulo_politica,
        dias_libres_disponibles: Number(diasNuevos).toFixed(2),
        ultima_actualizacion: Hoy.toISOString().slice(0, 10)
      };
      nuevosDias.push(libre);
    });
  });
  return nuevosDias;
}

module.exports = {
  actualizarTodos,
  calcularTiempos
};
