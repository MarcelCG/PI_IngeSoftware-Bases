import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

export const ViewPoliticas = () => {
  const {empresa} = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  
    async function cargarDatos() {
      try {
        const response = await axios.get(`http://localhost:5000/api/politicas/byCedula/${empresa}`);
        setItems(response.data);
        console.log(response.data);
        setLoading(true);
      } catch (error) {
        //console.error("Error fetching data:", error);
        setLoading(true);
      }
    }
    cargarDatos();
  }, [empresa]);

  function formatFecha(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  return (
    <div className="container bg-white rounded shadow" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {loading?(<div className="row p-3">
        {items.map((item, index) => (
          <div className="col-4 p-3 " key={index}>
            <div className="accordion" id={`accordion-${index}`}>
              <div className="accordion-item">
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    aria-expanded="false"
                    aria-controls={`collapse-${index}`}
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                  >
                    {item.titulo}
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${index}`}
                  data-bs-parent={`#accordion-${index}`}
                >
                  <div className="accordion-body container">
                    <div className="row alert alert-primary">
                      <div className="row">
                        <div className="col">Inicio: <strong>{formatFecha(item.fecha_inicio)}</strong>
                        </div>
                        <div className="col">Final: <strong>{formatFecha(item.fecha_final)}</strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">Periodo: <strong>{item.periodo}</strong>
                        </div>
                        <div className="col">Acumulativo: <strong>{item.acumulativo? "Si":"No"}</strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col ">Tiempo a dar: <strong>{item.dias_a_dar}</strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col ">Desde contratacion: <strong>{item.inicia_desde_contrato? "Si":"No"}</strong>
                        </div>
                      </div>
                     </div>
                      <div><strong>Descripcion: </strong>{item.descripcion}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>):
      (<div className="container d-flex align-items-center justify-content-center" style={{ height: '78vh' }}>
        <div className="spinner-grow text-primary" style={{ width: '8rem', height: '8rem' }} role="status" /> 
      </div>)}
    </div>
  );
};
