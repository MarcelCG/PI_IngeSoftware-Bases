import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BuscarSolicitud from '../../../componentes/Solicitudes/buscarSolicitud'; // Ajusta la ruta según tu estructura de archivos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

test('Renderizar el componente BuscarSolicitud', () => {
    const mockProps = {
      solicitud: [{ nombre_completo: 'John Doe', politica: 'Política 1', fecha_inicio: '2023-01-01', fecha_final: '2023-01-10', estado: 'Pendiente' }],
      filtrarsolicitudes: jest.fn(),
      esEmpleador: true,
      busqueda: 'John',
      buscar: jest.fn(),
      filtro: 'nombre_completo',
      filtrarPor: jest.fn(),
      estado: 'Todos',
      solicitudesFiltradas: [],
    };
  
    render(<BuscarSolicitud {...mockProps} />);
    
    const campoInput = screen.getByRole('textbox');
    expect(campoInput).toBeInTheDocument();
  
    const cajaFiltros = screen.getByRole('combobox');
    expect(cajaFiltros).toBeInTheDocument();
  });
