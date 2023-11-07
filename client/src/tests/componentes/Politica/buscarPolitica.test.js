import React from "react";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import BuscarPoliticas from "../../../componentes/Politicas/BuscarPolitica";

/*Preparación*/
// Simulado de políticas para usar en las pruebas
const politicas = [
    { titulo: "Política A", fecha_inicio: "2023-01-01", dias_a_dar: 10 },
    { titulo: "Política B", fecha_inicio: "2023-02-01", dias_a_dar: 15 },
];
// Simulado del useState [politicasFiltradas, filtrarPoliticas]
var politicasFiltradasSimulado = [];
const filtrarPoliticasSimulado = (politicas) => {
    politicasFiltradasSimulado = politicas;
};

// Una función de prueba simple para verificar si el componente se renderiza correctamente
test("Renderiza el componente BuscarPoliticas correctamente", () => {
    // Preparar
    render(<BuscarPoliticas />);

    // Actuar
    const entradaBusqueda = screen.getByPlaceholderText("Buscar...");
    const opciones = screen.getAllByRole("option");
    const botonBusqueda = screen.getByRole("button");

    // Afirmar
    expect(entradaBusqueda).toBeInTheDocument();
    expect(opciones.length).toBe(3); // Debes ajustar el número de opciones según tu componente
    expect(botonBusqueda).toBeInTheDocument();
});

// Una función de prueba para verificar si la búsqueda funciona y modifica el estado de politicasFiltradas
test("Buscar políticas por título", async () => {
    // Preparar
    const { getByPlaceholderText } = render(
        <BuscarPoliticas politicas={politicas} filtrarPoliticas={filtrarPoliticasSimulado} />
    );

    // Actuar

    // Simular la entrada de búsqueda
    const inputElement = getByPlaceholderText("Buscar...");
    fireEvent.change(inputElement, { target: { value: "Política A" } });

    // Simular el clic en el botón de búsqueda
    const botonBusqueda = screen.getByRole("button");
    fireEvent.click(botonBusqueda);

    // Esperar a que la función asincrónica se complete
    await waitFor(() => {
        // Probar
        expect(politicasFiltradasSimulado).toEqual([politicas[0]]);
    });
});