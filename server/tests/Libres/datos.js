const Anual = {
  titulo: 'Anual',
  cedula_empresa: '1-1111-1111',
  descripcion: '',
  periodo: 365,
  fecha_inicio: '2023-01-01',
  fecha_final: '2024-12-31',
  dias_a_dar: 10,
  inicia_desde_contrato: true,
  acumulativo: true,
  incrementativo: true,
  dias_a_incrementar: 0,
  activo: true
};

const Trimestral = {
  titulo: 'Trimestral',
  cedula_empresa: '1-1111-1111',
  descripcion: '',
  periodo: 90,
  fecha_inicio: '2023-01-01',
  fecha_final: '2024-12-31',
  dias_a_dar: 5,
  inicia_desde_contrato: true,
  acumulativo: true,
  incrementativo: true,
  dias_a_incrementar: 0,
  activo: true
};

const Mensual = {
  titulo: 'Mensual',
  cedula_empresa: '1-1111-1111',
  descripcion: '',
  periodo: 31,
  fecha_inicio: '2023-01-01',
  fecha_final: '2024-12-31',
  dias_a_dar: 1,
  inicia_desde_contrato: true,
  acumulativo: true,
  incrementativo: true,
  dias_a_incrementar: 0,
  activo: true
};

const Incrementativo = {
  titulo: 'Incrementativo',
  cedula_empresa: '1-1111-1111',
  descripcion: '',
  periodo: 10,
  fecha_inicio: '2023-01-01',
  fecha_final: '2024-12-31',
  dias_a_dar: 0,
  inicia_desde_contrato: true,
  acumulativo: true,
  incrementativo: true,
  dias_a_incrementar: 2,
  activo: true
};

const Inactivo = {
  titulo: 'Inactivo',
  cedula_empresa: '1-1111-1111',
  descripcion: '',
  periodo: 1,
  fecha_inicio: '2023-01-01',
  fecha_final: '2024-12-31',
  dias_a_dar: 100,
  inicia_desde_contrato: true,
  acumulativo: true,
  incrementativo: true,
  dias_a_incrementar: 10,
  activo: true
};

const FueraDeRangoMayor = {
  titulo: 'Fuera de rango',
  cedula_empresa: '1-1111-1111',
  descripcion: '',
  periodo: 1,
  fecha_inicio: '2024-01-01',
  fecha_final: '2025-12-31',
  dias_a_dar: 100,
  inicia_desde_contrato: true,
  acumulativo: true,
  incrementativo: true,
  dias_a_incrementar: 10,
  activo: true
};

const FueraDeRangoMenor = {
  titulo: 'Fuera de rango',
  cedula_empresa: '1-1111-1111',
  descripcion: '',
  periodo: 1,
  fecha_inicio: '2020-01-01',
  fecha_final: '2019-12-31',
  dias_a_dar: 100,
  inicia_desde_contrato: true,
  acumulativo: true,
  incrementativo: true,
  dias_a_incrementar: 10,
  activo: true
};

const Empleado1 = 
  {
    cedula: '4-0256-0399',
    cedula_empresa: '1-1111-1111',
    rol: 'Conserje',
    fecha_contratacion: '2023-07-03',
  };

const Empleado2 = 
  {
    cedula: '5-5555-5555',
    cedula_empresa: '1-1111-1111',
    rol: 'Marinero',
    fecha_contratacion: '2023-01-01',
  };

module.exports = {
  Empleado1,
  Empleado2,
  Mensual, 
  Incrementativo,
  Anual,
  Trimestral,
  Inactivo,
  FueraDeRangoMayor,
  FueraDeRangoMenor
};
