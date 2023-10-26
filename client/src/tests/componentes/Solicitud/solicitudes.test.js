import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import VerSolicitudesHTML from "../../../componentes/Solicitudes/VerSolicitudesHTML"
import FiltrarSolicitudes from "../../../componentes/Solicitudes/filtrarSolicitudes";
import {ModalSolicitud} from "../../../componentes/Solicitudes/modalSolicitud";

test("ModalSolicitud muestra correctamente la informacion de la solicitud", () => {
  const solicitud = {
    nombre_completo: "Juan Perez",
    dias_libres_solicitados: 1,
    fecha_inicio: "20/01/2023",
    fecha_final: "20/01/2023",
    politica: "Vejez",
    hora_inicio_nueva: "10:00",
    fecha_solicitud_nueva: "15/01/2023",
    hora_final: "12:00",
    horas_solicitadas: 2,
    comentarios: "",
    esEmpleador: true
  };
  //Preparar
  render(<ModalSolicitud {...solicitud}/>);

  //Actuar
  const politica = screen.getByText("Vejez");
  const horaInicio = screen.getByText("10:00")
  const horaFin = screen.getByText("12:00");

  //Afirmar
  expect(politica).toBeInTheDocument();
  expect(horaInicio).toBeInTheDocument();
  expect(horaFin).toBeInTheDocument();
  // Agrega más expectativas según tus necesidades
});

test("FiltrarSolicitudes filtra las solicitudes correctamente", async() => {

  // Datos de ejemplo
  const solicitudes = [
    { estado: "Pendiente" },
    { estado: "Aprobada" },
    { estado: "Rechazada" },
    { estado: "Aprobada" },
    { estado: "Pendiente" }
  ];

  var solicitudesFiltradasSimulado = [];
  const filtrarSolicitudesSimulado = (solicitudes) => {
    solicitudesFiltradasSimulado = solicitudes;
  }

  //Preparar
  render(<FiltrarSolicitudes solicitudes={solicitudes} filtrarSolicitudes={filtrarSolicitudesSimulado} />);

  const opciones = screen.getAllByRole("option");
  expect(opciones.length).toBe(4);
  
  // Filtrar por "Aprobada"
  const select = screen.getByRole("combobox");
  fireEvent.change(select, { target: { value: "Aprobada" } });

  await waitFor(() => {
    // Probar
    expect(solicitudesFiltradasSimulado.length).toBe(2);
  });
});