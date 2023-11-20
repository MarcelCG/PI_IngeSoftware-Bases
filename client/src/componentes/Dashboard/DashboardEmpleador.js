import React, {useState, useEffect, useRef} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { URLApi } from "../Compartido/Constantes";
import { useAutent } from "../../contexto/ContextoAutenticacion";
import { Modal } from "../Utiles/Modal";
import moment from 'moment'
import axios from 'axios';
import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizador = momentLocalizer(moment);
const URLFechasSolicitudes = URLApi + 'solicitudes/fechasAprobadas'

const etiquetas = {
    today: 'Hoy',
    next: 'Siguiente',
    previous: 'Anterior',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Empleado Libre',
    noEventsInRange: 'No hay empleados libres en este rango.',
    allDay: 'todo el día',
    showMore: total => `+${total} más`,
};

const formatos = {
    // Formato para el día en la sección semana
    dayFormat: (fecha, cultura, localizador) =>
        localizador.format(fecha, 'dddd', cultura).charAt(0).toUpperCase() +
        localizador.format(fecha, 'dddd D', cultura).slice(1),
    // Formato para el día en la sección mes
    weekdayFormat: (dia, cultura, localizador) =>
        localizador.format(dia, 'dddd', cultura).charAt(0).toUpperCase() +
        localizador.format(dia, 'dddd', cultura).slice(1),
    monthHeaderFormat: (fecha, cultura, localizador) =>
        localizador.format(fecha, 'MMMM YYYY', cultura).charAt(0).toUpperCase() +
        localizador.format(fecha, 'MMMM YYYY', cultura).slice(1),
    dayHeaderFormat: (fecha, cultura, localizador) =>
        localizador.format(fecha, 'dddd', cultura).charAt(0).toUpperCase() +
        localizador.format(fecha, 'dddd D ', cultura).slice(1) +
        localizador.format(fecha, 'MMMM', cultura).charAt(0).toUpperCase() +
        localizador.format(fecha, 'MMMM YYYY', cultura).slice(1),
    dayRangeHeaderFormat: ({ inicio, final }, cultura, localizador) =>
        localizador.format(inicio, 'ddd', cultura).charAt(0).toUpperCase() +
        localizador.format(inicio, 'dddd D ', cultura).slice(1) +
        localizador.format(inicio, 'MMMM', cultura).charAt(0).toUpperCase() +
        localizador.format(inicio, 'MMMM YYYY', cultura).slice(1) +
        ' - ' +
        localizador.format(final, 'ddd', cultura).charAt(0).toUpperCase() +
        localizador.format(final, 'dddd D ', cultura).slice(1) +
        localizador.format(final, 'MMMM', cultura).charAt(0).toUpperCase() +
        localizador.format(final, 'MMMM YYYY', cultura).slice(1),
    agendaDateFormat: (fecha, cultura, localizador) =>
        localizador.format(fecha, 'D ', cultura) +
        localizador.format(fecha, 'MMMM', cultura).charAt(0).toUpperCase() +
        localizador.format(fecha, 'MMMM YYYY', cultura).slice(1),
        
};

const darFormatoUTC = (fecha) => {
    fecha = new Date(fecha);
    var año = fecha.getUTCFullYear();
    var mes = fecha.getUTCMonth();
    var dia = fecha.getUTCDate();
    var horas = fecha.getUTCHours();
    var minutos = fecha.getUTCMinutes();

    return new Date(año, mes, dia, horas, minutos, 0);
}

function DashboardEmpleador() {
    const {usuarioAutenticado} = useAutent(); 
    const empresa = usuarioAutenticado.cedula_empresa;

    const modalID = "modalEvento";
    const botonRef = useRef(null);
    const [eventoValores, setEventoValores] = useState({
        titulo: "",
        componente: "",
        modalID,
      });

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const obtenerEventos = async () => {
            axios.get(`${URLFechasSolicitudes}/${empresa}`)
                .then((respuesta) => {
                    respuesta = respuesta.data;

                    const eventosMapeados = respuesta.map(evento => ({
                        ...evento,
                        fecha_inicio: darFormatoUTC(evento.fecha_inicio),
                        fecha_final: darFormatoUTC(evento.fecha_final),
                      }));
                    setEventos(eventosMapeados);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 405) {
                        console.log('No se encontraron eventos');
                    } else {
                        console.error('Error al obtener las solicitudes: ', error);
                    }
                })
        };

        obtenerEventos();
    }, []);

    const abrirModalEvento = (evento) => {
        console.log(evento);
        setEventoValores({
            titulo: "Empleado Libre",
            componente:
                <div>
                    <strong>Nombre Empleado: </strong>{evento.nombre_empleado}<br/>
                    <strong>Comentarios: </strong> {evento.comentarios}
                </div>,
            modalID,
            tituloEstilos: 'titulo-ventana',
        });
        botonRef.current.click();
    }

    return (
        <>
        <div ref={botonRef} 
	      data-bs-toggle="modal" data-bs-target={`#${eventoValores.modalID}`}/>
          <Modal {...eventoValores}/>
        <div className="mt-3 mb-3">
            <Calendar
            localizer={localizador}
            events={eventos}
            startAccessor="fecha_inicio"
            endAccessor="fecha_final"
            titleAccessor="nombre_empleado"
            messages={etiquetas}
            formats={formatos}
            onSelectEvent={evento => abrirModalEvento(evento)}
            style={{ minHeight: 500 }}
            />
        </div>
        </>
    )
}

export default DashboardEmpleador;