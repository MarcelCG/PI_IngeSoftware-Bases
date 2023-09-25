import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function VisualizarEmpresa() {

    //Se definen los valores iniciales para los atributos de la empresa
    const [datosEmpresa, setDatosDeEmpresa] = useState( {
        nombre: "Empresa prueba",
        cedulaJuridica: "0123456789",
        telefono: "2222-2222",
        correoInformativo: "info@prueba.com",
    });

    const cargarDatosEmpresa = () => {
        // Simulación de carga de datos del empleado
        // Eventualmente debe ser cambiado para traer los datos de la base de datos
        const datosEmpleado = {
            nombre: "Empresa prueba",
            cedulaJuridica: "0123456789",
            telefono: "2222-2222",
            correoInformativo: "info@prueba.com",
        };
        setDatosDeEmpresa(datosEmpleado);
      };

    // Llama a la función para cargar los datos del empleado cuando se carga el componente (Base de datos)
    useEffect(() => { cargarDatosEmpresa();}, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Información de la Empresa</h2>
            <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card mb-3">
                <div className="card-header" style={{ backgroundColor: '#4f709c', color: '#ffffff' }}>
                    <h5 className="mb-0">Datos Personales</h5>
                </div>
                <div className="card-body">
                    <p><strong>Nombre:</strong> {datosEmpresa.nombre}</p>
                    <p><strong>Cédula Juridica:</strong> {datosEmpresa.cedulaJuridica}</p>
                    <p><strong>Telefono:</strong> {datosEmpresa.telefono}</p>
                    <p><strong>Correo Informativo:</strong> {datosEmpresa.telefono}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default VisualizarEmpresa;