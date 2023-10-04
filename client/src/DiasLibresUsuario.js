import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function DiasLibresUsuario({ cedulaUsuario }) { // Recibe la cédula del usuario como parámetro
  const [politicas, setPoliticas] = useState([]);
  const [totalDiasLibres, setTotalDiasLibres] = useState(0);

  

  // Llama a la función para cargar los datos de días libres cuando se carga el componente
  useEffect(() => {
    const cargarDiasLibres = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/libres/byEmpleado/${cedulaUsuario}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          const data = await response.json();
          setPoliticas(data);
          const totalDias = data.reduce((total, politica) => total + politica.dias_libres_disponibles, 0);
          setTotalDiasLibres(totalDias);
        } else {
          throw new Error('Error al cargar días libres');
        }
      } catch (error) {
        console.error('Error al cargar días libres:', error);
      }
    };
    cargarDiasLibres();
  }, [cedulaUsuario]); // Agrega cedulaUsuario como dependencia

  return (
    <div className="container col-5 align-middle position-static">
      <div className="card shadow m-3">
        <Card.Body>
          <Card.Title>Total de Vacaciones: {totalDiasLibres} días</Card.Title>
          <Card.Text>Desglose de Políticas:</Card.Text>
          <ListGroup>
            {politicas.map((politica) => (
              <ListGroup.Item key={politica.titulo_politica}>
                {politica.titulo_politica}: {politica.dias_libres_disponibles} día(s)
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </div>
    </div>
  );
}

export default DiasLibresUsuario;
