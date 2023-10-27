import React from 'react';
import { useAutent } from '../contexto/ContextoAutenticacion';
import VisualizarEmpleadorPorCedula from '../componentes/Empleador/VisualizarEmpleador';
import VisualizarEmpleado from '../componentes/Empleado/visualizarEmpleado';
import VisualizarEmpresa from '../componentes/Empresa/VisualizarEmpresa';

function VisualizarPerfil (){
    const {usuarioAutenticado} = useAutent();
    const esEmpleador = usuarioAutenticado?.esEmpleador;
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="row col-12">
                    <div className="card col-6 p-0">
                    <div className="card-header  titulo-ventana">
                        <h5 className="text-center mb-0">Información del Usuario</h5>
                    </div>
                        {esEmpleador ? <VisualizarEmpleadorPorCedula/> : <VisualizarEmpleado/>}
                    </div>
                    <div className='card col-6 p-0'>
                        <div className="card-header  titulo-ventana">
                            <h5 className="text-center mb-0">Información de la Empresa</h5>
                        </div>
                        <VisualizarEmpresa/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisualizarPerfil;