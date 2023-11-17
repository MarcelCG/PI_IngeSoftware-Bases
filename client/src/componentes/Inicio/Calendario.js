import React, {useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizador = momentLocalizer(moment);

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
    showMore: total => `+${total} más`,
};

const formatos = {
    dayFormat: (fecha, cultura, localizador) =>
        localizador.format(fecha, 'dddd', cultura).charAt(0).toUpperCase() +
        localizador.format(fecha, 'dddd D', cultura).slice(1),
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

function Calendario() {
    const fechaHoy = new Date();

    // Crea un evento de ejemplo con la fecha actual
    const eventos = [
        {
            nombreEmpleado: 'Juan Miguel',
            inicio: fechaHoy,
            final: fechaHoy,
        },
    ];

    return (
        <div>
            <Calendar
            localizer={localizador}
            events={eventos}
            startAccessor="inicio"
            endAccessor="final"
            titleAccessor="nombreEmpleado"
            messages={etiquetas}
            formats={formatos}
            style={{ minHeight: 500 }}
            />
        </div>
    )
}

export default Calendario;