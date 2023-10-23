const calcularTiempos = require('../../servicios/libresServicios/libresServicios');
const datos = require('./datos.js');
'
test('Cantidad de Empleados modificados esperada', () => {
    // Arrange
    const Politicas = datos.Politicas; 
    const Libres = datos.Libres; 
    const Empleados = datos.Empleados;
    const fecha = new Date("2023-07-01");
    const empleadosModificadosEsperados = 3;
    // Act 
    const LibresNuevo = calcularTiempos(Politicas, Libres, Empleados);
    // Assert
    expect(LibresNuevo.length).toEqual(empleadosModificadosEsperados);
});