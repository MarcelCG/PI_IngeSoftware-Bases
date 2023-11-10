import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import FormularioSolicitud from '../../../componentes/Solicitudes/FormularioSolicitud';

test('Renderizar el componente FormularioSolicitud', () => {
  const mockProps = {
    libresPorPolitica: [{ titulo_politica: 'Política 1', dias_libres_disponibles: 5 }],
    handleCancel: jest.fn(),
    register: jest.fn(),
    onSubmit: jest.fn(),
    errors: {},
  };

  render(<FormularioSolicitud {...mockProps} />);
  
  expect(screen.getByText("Seleccione la Politica:")).toBeInTheDocument();
});
