const LibresServicios = require('../../servicios/libresServicios/libresServicios');
const {
  Anual,
  Inactivo,
  FueraDeRangoMayor,
  FueraDeRangoMenor,
  Mensual,
  Trimestral,
  Incrementativo,
  Empleado1,
  Empleado2 } = require('./datos.js');

test("Cantidad de Libres nuevos", () => {
    // Arrange
    const Politicas = [ Anual, Mensual, Trimestral, Incrementativo ]; 
    const Libres = [];
    const Empleados = [Empleado1, Empleado2];
    for (let i = 0; i < Empleados.length; ++i) {
      for (let j = 0; j < Politicas.length; ++j) {
          const Libre = {
            cedula_empleado: Empleados[i].cedula,
            titulo_politica: Politicas[j].titulo,
            cedula_empresa: Politicas[j].cedula_empresa,
            dias_libres_disponibles: 0,
            dias_libres_utilizados: 0,
            ultima_actualizacion: null
          };
        Libres.push(Libre);
      }
    }
    const fecha = new Date("2023-10-10");
    const empleadosModificadosEsperados = 8;
    // Act 
    const LibresNuevo = LibresServicios.calcularTiempos(Politicas, Libres, Empleados, fecha);
    // Assert
    expect(LibresNuevo.length).toEqual(empleadosModificadosEsperados);
});

test("Calculo correcto [Anual]", () => {
  // Arrange
  const Politicas = [ Anual ]; 
  const Libres = [];
  const Empleados = [ Empleado2 ];
  const Libre = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Anual.titulo,
    cedula_empresa: Anual.cedula_empresa,
    dias_libres_disponibles: 0,
    dias_libres_utilizados: 0,
    ultima_actualizacion: null
  };
  Libres.push(Libre); 
  const fecha = new Date("2023-12-31");
  const LibreEsperado = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Anual.titulo,
    dias_libres_disponibles: '10.00',
    ultima_actualizacion: "2023-12-31",
    nuevos_libres: '10.00'
  };
  // Act 
  const LibresNuevo = LibresServicios.calcularTiempos(Politicas, Libres, Empleados, fecha);
  console.log(LibresNuevo);
  console.log(LibreEsperado);
  // Assert
  expect(LibresNuevo[0]).toEqual(LibreEsperado);
});

test("Calculo correcto [Mensual]", () => {
  // Arrange
  const Politicas = [ Mensual ]; 
  const Libres = [];
  const Empleados = [ Empleado2 ];
  const Libre = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Mensual.titulo,
    cedula_empresa: Mensual.cedula_empresa,
    dias_libres_disponibles: 0,
    dias_libres_utilizados: 0,
    ultima_actualizacion: null
  };
  Libres.push(Libre);
  const fechaStr = "2023-02-01";
  const fecha = new Date(fechaStr);
  const LibreEsperado = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Mensual.titulo,
    dias_libres_disponibles: '1.00',
    ultima_actualizacion: fechaStr,
    nuevos_libres: '1.00'

  };
  // Act 
  const LibresNuevo = LibresServicios.calcularTiempos(Politicas, Libres, Empleados, fecha);
  // Assert
  expect(LibresNuevo[0]).toEqual(LibreEsperado);
});

test("Calculo correcto [Trimestral]", () => {
  // Arrange
  const Politicas = [ Trimestral ]; 
  const Libres = [];
  const Empleados = [ Empleado2 ];
  const Libre = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Trimestral.titulo,
    cedula_empresa: Trimestral.cedula_empresa,
    dias_libres_disponibles: 0,
    dias_libres_utilizados: 0,
    ultima_actualizacion: null
  };
  Libres.push(Libre);
  const fechaStr = "2023-04-01";
  const fecha = new Date(fechaStr);
  const LibreEsperado = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Trimestral.titulo,
    dias_libres_disponibles: '5.00',
    ultima_actualizacion: fechaStr,
    nuevos_libres: '5.00'
  };
  // Act 
  const LibresNuevo = LibresServicios.calcularTiempos(Politicas, Libres, Empleados, fecha);
  // Assert
  expect(LibresNuevo[0]).toEqual(LibreEsperado);
});

test("Calculo correcto [Incrementativo]", () => {
  // Arrange
  const Politicas = [ Incrementativo ]; 
  const Libres = [];
  const Empleados = [ Empleado2 ];
  const Libre = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Incrementativo.titulo,
    cedula_empresa: Incrementativo.cedula_empresa,
    dias_libres_disponibles: 0,
    dias_libres_utilizados: 0,
    ultima_actualizacion: null
  };
  Libres.push(Libre);
  const fechaStr = "2023-03-01";
  const fecha = new Date(fechaStr);
  const LibreEsperado = {
    cedula_empleado: Empleado2.cedula,
    titulo_politica: Incrementativo.titulo,
    dias_libres_disponibles: '42.00',
    ultima_actualizacion: fechaStr,
    nuevos_libres: '42.00'
  };
  // Act 
  const LibresNuevo = LibresServicios.calcularTiempos(Politicas, Libres, Empleados, fecha);
  // Assert
  expect(LibresNuevo[0]).toEqual(LibreEsperado);
});