import React from "react";
import { URLApi } from "../Compartido/Constantes";
import axios from "axios";
import {toast } from 'react-toastify';

const aprobarSolicitudURL = URLApi+'solicitudes/aprobar/';
const rechazarSolicitudURL = URLApi+'solicitudes/rechazar/';

export const ModalConfirmar = (props) => {
  return (
    <div className="text-center">
      <h3>¿Está seguro de realizar esta acción?</h3>
      <p>(Esta acción es irreversible)</p>
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