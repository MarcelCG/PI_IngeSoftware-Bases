import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
 
function DiasLibresUsuario() {
  const [politicas,setDatosDeEmpresa] = useState([]);

  const cargarDiasLibres = () => {
    // Simulación de carga de datos del empleado
    // Eventualmente debe ser cambiado para traer los datos de la base de datos
    const diasLibres = [
      { nombre: 'Política 1', dias: 1 },
      { nombre: 'Política 2', dias: 2 },
      { nombre: 'Política 3', dias: 3 },
    ];
    setDatosDeEmpresa(diasLibres);
  };

// Llama a la función para cargar los datos del empleado cuando se carga el componente (Base de datos)
useEffect(() => { cargarDiasLibres();}, []);



  const totalDiasLibres = politicas.reduce((total, politica) => total + politica.dias, 0);



  return (
    <div className="container col-5 align-middle position-static">
      <div className="card shadow m-3">
        <Card.Header>Total de Vacaciones</Card.Header>
        <Card.Body>
          <Card.Title>Total de Vacaciones: {totalDiasLibres} días</Card.Title>
          <Card.Text>Desglose de Políticas:</Card.Text>
          <ListGroup>
            {politicas.map((politica) => (
              <ListGroup.Item key={politica.nombre}>
                {politica.nombre}: {politica.dias} día(s)
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </div>
    </div>
  );
}

export default DiasLibresUsuario;
