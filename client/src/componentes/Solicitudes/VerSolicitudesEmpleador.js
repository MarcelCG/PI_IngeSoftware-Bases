import axios from 'axios';
import {VerSolicitudesEmpleadorHTML} from './VerSolicitudesEmpleadorHTML.js'
import 'bootstrap/dist/css/bootstrap.css';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useState, useEffect} from "react";
import { URLApi } from '../Compartido/Constantes';

const solicitudURI = URLApi + 'solicitudes/byEmpresa/';

const SolicitudesEmpleador = () => {
    const {usuarioAutenticado} = useAutent();
    const empresa = usuarioAutenticado.cedula_empresa;

    useEffect(() => {
        if (empresa) {
            const solicitudesEmpresaURI = solicitudURI + empresa;
            const obtenerSolicitudesDeEmpresa = async () => {
                try {
                    const respuesta = await axios.get(solicitudesEmpresaURI);
                    setSolicitud(respuesta.data);
                } 
                catch (error) {
                    console.error('Error al obtener las solicitudes:', error);
                }
            };
        obtenerSolicitudesDeEmpresa();
        }
    }, [empresa]);

    const [solicitudes, setSolicitud] = useState([]);

    const [paginaActual, setPaginaActual] = useState(1);
    const solicitudesPorPagina = 5;
    const ultimoIndice = paginaActual * solicitudesPorPagina;
    const primerIndice = ultimoIndice - solicitudesPorPagina;
    const solicitudesPagina = solicitudes.slice(primerIndice, ultimoIndice);
    const numPag = Math.ceil(solicitudes.length/solicitudesPorPagina);
    const numeros = [...Array(numPag +1).keys()].slice(1)
  
    function paginaAtras() {
        if(paginaActual !== 1) {
            setPaginaActual(paginaActual-1)
        }
    }
    function cambiarPagina(id) {
        setPaginaActual(id)
    }
    function siguientePagina() {
        if(paginaActual !== numPag) {
            setPaginaActual(paginaActual+1)
        }
    }

    solicitudes.forEach(solicitud => {
        const inicio = solicitud["inicio_fechas_solicitadas"].substring(0,10);
        const inicioFechaSolicitada = new Date(inicio);

        const diasLibresSolicitados = solicitud["dias_libres_solicitados"];
        const fechaFinal = sumarDiasHabiles(inicioFechaSolicitada, diasLibresSolicitados);

        const fechaInicioFormato = formatoFecha(inicioFechaSolicitada);
        const fechaFinalFormato = formatoFecha(fechaFinal);

        solicitud["fecha_inicio"] = fechaInicioFormato;
        solicitud["fecha_final"] = fechaFinalFormato;
    });
    
    function formatoFecha(fecha) {
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');

        const fechaFormato = `${day}/${month}/${year}`;
        return fechaFormato;
    }

	function sumarDiasHabiles(fecha, dias) {
        dias--;
        let fechaFinal = new Date(fecha);
		while (dias > 0) {
			fechaFinal.setDate(fechaFinal.getDate() + 1);
			if (fechaFinal.getDay() !== 0) {
			    dias--;
			}
		}
		return fechaFinal;
	}

    let props = {
        solicitudesPagina,
        paginaAtras,
        cambiarPagina,
        siguientePagina,
        paginaActual,
        numeros
    };
  
    return ( <VerSolicitudesEmpleadorHTML {...props}/> );
};

export default SolicitudesEmpleador;
  
