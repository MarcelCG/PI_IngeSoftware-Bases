const express = require('express');
const router = express.Router();
const LibModel = require('../../models/libresModel/libresModel');
const PolModel = require('../../models/politicaModel/politicasModel');
const EmpleModel = require('../../models/usuarioModel/Empleado/empleadoModel');
const PoliticaServicio =
  require('../politicaServicios/politicaServicios');

async function actualizarTodos(cedula_empresa) {
  try {
    const [Empleados, Libres, Politicas] = await Promise.all([
      EmpleModel.getAllByEmpresa(cedula_empresa),
      LibModel.obtenerPorEmpresa(cedula_empresa),
      PolModel.getByCedulaEmpresa(cedula_empresa),
    ]);

    const politicasVigentes = Politicas.filter(pol => PoliticaServicio.vigente(pol));
    const nuevosDias = calcularTiempos(politicasVigentes, Libres, Empleados);
     console.log("1");
    const magico = 0;//await  LibModel.actualizarTodos(nuevosDias, cedula_empresa);
     console.log("4");
    if (magico >= 0) {
      return magico;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error al actualizar todos:", error);
    return 0;
  }
}

const Gauss = (n) => {
  console.log("->>>", n);
  return Number((n * (n + 1)) / 2).toFixed(2);
};

function calcularTiempos(PoliticasVigentes, Libres, Empleados) {
  const nuevosDias = [];
  const hoy = new Date();
  const haceUnMes = new Date(hoy);
  haceUnMes.setMonth(hoy.getMonth() - 1);
  const milisegDia = 86400000;

  PoliticasVigentes.forEach(pol => {
    pol.fecha_final = new Date(pol.fecha_final);
    pol.fecha_inicio = new Date(pol.fecha_inicio);
    Libres.filter(lib =>
    lib.titulo_politica === pol.titulo).forEach(lib => {
        
      const empleado =
        Empleados.find(E => E.cedula === lib.cedula_empleado);
      const fechaContratacion = new Date(empleado.fecha_contratacion);

      const minFecha = new Date(
        Math.max(pol.fecha_inicio, fechaContratacion));
      const maxFecha = new Date(Math.min(pol.fecha_final, hoy));

      const periodosMes = ((maxFecha - haceUnMes) / milisegDia)/pol.periodo;
       console.log("Izq(",minFecha,")");
       console.log("Der(",maxFecha,")");
       console.log("P(",periodosMes,")");
      const periodosTotales = lib.periodos_recorridos + periodosMes;

      let diasNuevos = (pol.acumulativo === true) ?
        periodosMes * pol.dias_a_dar + lib.dias_libres_disponibles :
        periodosMes * pol.dias_a_dar;

      if (pol.incrementativo === true) {
        diasNuevos += pol.dias_a_incrementar *
        (Gauss(periodosTotales) - Gauss(lib.periodos_recorridos));

        // console.log("Gauss1(",periodosTotales,")");
        // console.log("Gauss2(",lib.periodos_recorridos,")");
        // console.log("= ", diasNuevos);
      }

      const libre = {
        cedula_empleado: lib.cedula_empleado,
        titulo_politica: lib.titulo_politica,
        dias_libres_disponibles: Number(diasNuevos.toFixed(2)),
        periodos_recorridos: Number(periodosTotales.toFixed(2))
      };
      console.log(libre);

      nuevosDias.push(libre);
    });
  });

  return nuevosDias;
}


module.exports = {
  actualizarTodos
};



