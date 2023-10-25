import axios from 'axios';
import {VerSolicitudesEmpleadorHTML} from './VerSolicitudesEmpleadorHTML.js'
import {ModalSolicitud} from './modalSolicitudEmpleador.js';
import { FooterModalSolicitudEmpleador } from './footerModalSolicitudEmpleador.js';
import 'bootstrap/dist/css/bootstrap.css';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useState, useEffect, useRef} from "react";
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
                    setSolicitudes(respuesta.data);
                } 
                catch (error) {
                    console.error('Error al obtener las solicitudes:', error);
                }
            };
        obtenerSolicitudesDeEmpresa();
        }
    }, [empresa]);
    const [solicitudes, setSolicitudes] = useState([]);

    const modalID = "modalSolicitud";
    const botonRef = useRef(null);
    const [solicitudValores, setSolicitudValores] = useState({
      titulo: "",
      componente: "",
      footerPersonalizado: ""
    });

    const abrirModalSolicitud = (solicitud) => {
        setSolicitudValores({
         ...solicitudValores,
         titulo: "Solicitud",
         componente: <ModalSolicitud {...solicitud}/>,
         footerPersonalizado: <FooterModalSolicitudEmpleador {...solicitud}/>})
        botonRef.current.click();
    };

    // variables de paginacion
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
        const inicio = solicitud["inicio_fechas_solicitadas"];
        const inicioFechaSolicitada = new Date(inicio);

        const fechaSolicitud = solicitud["fecha_solicitud"];
        const fechaSolicitudNueva= new Date(fechaSolicitud);

        const diasLibresSolicitados = solicitud["dias_libres_solicitados"];
        const fechaFinal = sumarDiasHabiles(inicioFechaSolicitada, diasLibresSolicitados);

        const horaInicio = solicitud["hora_de_inicio"];
        const horaInicioNueva = new Date(horaInicio);

        const horasSolicitadas = solicitud["horas_solicitadas"];
        const horaFinal = sumarHoras(horaInicioNueva, horasSolicitadas);
        
        const horaInicioFormato = formatoHora(horaInicioNueva);
        const horaFinalFormato = formatoHora(horaFinal);

        const fechaInicioFormato = formatoFecha(inicioFechaSolicitada);
        const fechaFinalFormato = formatoFecha(fechaFinal);
        const fechaSolicitudFormato = formatoFecha(fechaSolicitudNueva)

        solicitud["fecha_inicio"] = fechaInicioFormato;
        solicitud["fecha_final"] = fechaFinalFormato;
        solicitud["fecha_solicitud_nueva"] = fechaSolicitudFormato;
        solicitud["hora_inicio_nueva"] = horaInicioFormato;
        solicitud["hora_final"] = horaFinalFormato;
    });

    function formatoFecha(fecha) {
        fecha.setDate(fecha.getDate() + 1); // Advance the date by one day
      
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');
      
        const fechaFormato = `${day}/${month}/${year}`;
        return fechaFormato;
    }  

    function formatoHora(fecha) {
        const fechaNueva = new Date(fecha);
        const horas = fechaNueva.getUTCHours();
        const minutos = fechaNueva.getUTCMinutes();

        const horaFormato = horas.toString().padStart(2, '0');
        const minutosFormato = minutos.toString().padStart(2, '0');
        const horaFormateada = `${horaFormato}:${minutosFormato}`;
        return horaFormateada;
    }

	function sumarDiasHabiles(fecha, dias) {
        --dias;
        let fechaFinal = new Date(fecha);
		while (dias > 0) {
			fechaFinal.setDate(fechaFinal.getDate() + 1);
			if (fechaFinal.getDay() !== 0) {
			    dias--;
			}
		}
        if (fechaFinal.getDay() == 6) {
            console.log(fechaFinal)
            fechaFinal.setDate(fechaFinal.getDate() + 1);
        }
		return fechaFinal;
	}

    function sumarHoras(horaInicio, horasSolicitadas) {
        const fechaNueva = new Date(horaInicio);

        const horas = fechaNueva.getUTCHours();
        const minutos = fechaNueva.getUTCMinutes();
        const horaFinal = horas + horasSolicitadas;

        fechaNueva.setUTCHours(horaFinal, minutos, 0, 0);
        return fechaNueva;
    }

    let props = {
        ...solicitudValores,
        solicitudesPagina,
        paginaAtras,
        cambiarPagina,
        siguientePagina,
        paginaActual,
        numeros,
        abrirModalSolicitud,
        modalID,
        botonRef
    };
  
    return ( <VerSolicitudesEmpleadorHTML {...props}/> );
};

export default SolicitudesEmpleador;
  
