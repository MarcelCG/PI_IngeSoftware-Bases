import React from "react";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import BuscarEmpleados from "../../../componentes/Empleado/buscarEmpleados";

/*Preparación*/
// Simulado de empleados para usar en las pruebas
const empleados = [
    { nombre_completo: "Juan Perez", correo: "juan@example.com", cedula: "12345", rol: "Empleado" },
    { nombre_completo: "María Lopez", correo: "maria@example.com", cedula: "54321", rol: "Gerente" },
];
// Simulado de del useState [empleadosFiltrados, filtrarEmpleados]
var empleadosFiltradosSimulado = [];
const filtrarEmpleadosSimulado = (empleados) => {
    empleadosFiltradosSimulado = empleados;
}

// Una función de prueba simple para verificar si el componente se renderiza correctamente
test("Renderiza el componente BuscarEmpleados correctamente", () => {
    // Preparar
    render(<BuscarEmpleados />);

    // Actuar
    const entradaBusqueda = screen.getByPlaceholderText("Buscar...");
    const opciones = screen.getAllByRole('option');
    const botonBusqueda = screen.getByRole("button");

    // Afirmar
    expect(entradaBusqueda).toBeInTheDocument();
    expect(opciones.length).toBe(4)
    expect(botonBusqueda).toBeInTheDocument();
});

// Una función de prueba para verificar si la búsqueda funciona y modifica el estado de empleadosFiltrados
test("Buscar empleados por nombre_completo", async() => {
    //Preparar
    const { getByPlaceholderText } = render(<BuscarEmpleados empleados={empleados} filtrarEmpleados={filtrarEmpleadosSimulado} />);

    //Actuar

    // Simular la entrada de búsqueda
    const inputElement = getByPlaceholderText("Buscar...");
    fireEvent.change(inputElement, { target: { value: "Juan" } });

    // Simular el clic en el botón de búsqueda
    const botonBusqueda = screen.getByRole("button");
    fireEvent.click(botonBusqueda);

    // Esperar a que la función asincrónica se complete
    await waitFor(() => {
        // Probar
        expect(empleadosFiltradosSimulado).toEqual([empleados[0]]);
        });
});
