import React from "react";
import { URLApi } from "../Compartido/Constantes";
import axios from "axios";
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const aprobarSolicitudURL = URLApi+'solicitudes/aprobar/';
const rechazarSolicitudURL = URLApi+'solicitudes/rechazar/';
const cancelarSolicitudURL = URLApi+'solicitudes/cancelar/';

export const ModalConfirmar = (props) => {
  return (
    <div className="text-center">
      <h3>¿Está seguro de realizar esta acción?</h3>
      <p>(Esta acción es irreversible)</p>
    </div>
  );
}

export const CancelarSolicitud = (solicitud) => {
    const navigate = useNavigate();

    const fecha = new Date();

    const añoUTC = fecha.getUTCFullYear();
    const mesUTC = fecha.getUTCMonth() + 1; 
    const diaUTC = fecha.getUTCDate();
    const horasUTC = fecha.getUTCHours();
    const minutosUTC = fecha.getUTCMinutes();
    const segundosUTC = fecha.getUTCSeconds();
    
    const fechaEnUTC = `${añoUTC}-${mesUTC.toString().padStart(2, '0')}-${diaUTC.toString().padStart(2, '0')}T${horasUTC.toString().padStart(2, '0')}:${minutosUTC.toString().padStart(2, '0')}:${segundosUTC.toString().padStart(2, '0')}.000Z`;
    
    const fechaActual = new Date(fechaEnUTC);
    const fechaSolicitud = new Date(solicitud.solicitud.inicio_fechas_solicitadas);


    const comparacion = fechaActual.getTime() - fechaSolicitud.getTime();



    const cancelar = (solicitud) => {
        console.log(solicitud.solicitud);
        if(solicitud.solicitud.estado === "Rechazada"){
            toast.error('No se pudo completar la operacion. La solicitud fue rechazada.');
        }else if(solicitud.solicitud.estado === "Aprobada" && comparacion>0){
            toast.error('No se pudo completar la operacion. Las vacaciones ya fueron utilizadas');
        }else if(solicitud.solicitud.estado === "Cancelada"){
            toast.error('No se pudo completar la operacion. Las solicitud ya fue cancelada');
        }else {
            try {
                axios.post(`${cancelarSolicitudURL}${solicitud.solicitud.id}`).then((response) => {
                    toast.success('Solicitud cancelada correctamente');
                    setTimeout(() => {
                        navigate(0);
                    }, 3000);
                }).catch((error) => {
                    if (error.response && error.response.status === 404) {
                        toast.error('Hubo un error al actualizar, por favor recargue e intente de nuevo');
                    } else {
                        console.error('Error en la solicitud POST:', error);
                    }
                })
            } 
            catch (error) {
                toast.error('Hubo un error al actualizar, por favor intente de nuevo más tarde');
            }
        }
    }

    return (
        <div>
          <button className="btn-danger me-2" data-bs-dismiss="modal">Volver</button>
          <button className="btn-primary me-2" data-bs-dismiss="modal" onClick={()=> cancelar(solicitud)} >Confirmar</button>
        </div>
    );
}

export const GestionarSolicitudes = (props) => {
    const {accion, solicitud} = props;
    const realizarAccion = () => {
        let url = '';
        let estado = '';
        if (accion === 'Aprobar') {
            url = aprobarSolicitudURL;
            estado = 'Aprobada';
        } else if (accion === 'Rechazar') {
            url = rechazarSolicitudURL;
            estado = 'Rechazada';
        }
        try {
            axios.post(`${url}${solicitud.id}`).then((response) => {
                console.log('Solicitud POST exitosa:', response.data);
                solicitud.estado = estado;
                toast.success(`Solicitud ${estado.toLowerCase()} correctamente`);
            }).catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.error('Error',error.response.data.error, error);
                    toast.error('Hubo un error al actualizar, por favor recargue e intente de nuevo');
                } else {
                    console.error('Error en la solicitud POST:', error);
                }
            })
        } 
        catch (error) {
            console.error('Error al aprobar la solicitud:', error);
            toast.error('Hubo un error al actualizar, por favor intente de nuevo más tarde');
        }
    }
    return (
        <div>
          <button className="btn-danger me-2" data-bs-dismiss="modal">Volver</button>
          <button className="btn-primary me-2" data-bs-dismiss="modal" onClick={realizarAccion}>Confirmar</button>
        </div>
    );
}