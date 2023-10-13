import axios from 'axios';
import {Modal} from '../Utiles/Modal'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {VerPolitica, ajustarFecha} from './verPolitica'
import React, {useState, useEffect, useRef} from "react";

export const ViewPoliticas = () => {
  // esto lo dejo asi por el momento ya que es para probar 
  // mas facil con "ElEquipo", y tambien porque al final hay que modi-
  // ficarlo con lo de los cookies
  const empresa = "cedula_empresa"; 
  useEffect(() => {
    async function cargarPoliticas() {
      try {
        const respuesta = await axios.get(
          `http://localhost:5000/api/politicas/byCedula/${empresa}`);
        setPoliticas(respuesta.data);
        setCargando(true);
      } catch (error) {
        setCargando(true);
      }
    }
    cargarPoliticas();
  }, []);

  const modalID = "modalPol";
  const [Politicas, setPoliticas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [polValores, setPolValores] = useState({
    titulo: "",
    componente: ""
  });

  // variables para la paginacion del GRID
  const [paginaActual, actualizarPagina] = useState(1);
    const politicasPorPag = 5;
    const ultimoInd = paginaActual * politicasPorPag;
    const primerInd = ultimoInd - politicasPorPag;
    const politicasActuales = Politicas.slice(primerInd, ultimoInd);
    const numPag = Math.ceil(Politicas.length/politicasPorPag);
    const numeros = [...Array(numPag +1).keys()].slice(1)

  const botonRef = useRef(null);
  let props = {...polValores, modalID};

  const abrirModalPolitica = (politica) => {
    setPolValores({
     ...polValores,
     titulo: politica.titulo,
     componente: <VerPolitica {...politica}/>});
    botonRef.current.click();
  };

  return (
  <div className="container">
    {cargando ? (
      <div className="row p-3">
      <Modal{... props}/>
      <div ref={botonRef} 
        data-bs-toggle="modal" data-bs-target={`#${modalID}`}/>
        <style>{`.table th { width: 33.33%;}`}</style>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Titulo </th>
              <th scope="col">Inicio</th>
              <th scope="col">Dias a dar</th>
            </tr>
          </thead>
          <tbody>
            {politicasActuales.map((politica, index) => (
              <tr key={index} 
                onClick={()=> abrirModalPolitica(politica)}>
                <td>{politica.titulo}</td>
                <td>{ajustarFecha(politica.fecha_inicio)}</td>
                <td>{politica.dias_a_dar}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {numeros.map((n) => (
              <li className={`page-item ${paginaActual === n ?
              'active' : ''}`} key={n}>
                <a className="page-link"
                  onClick={() => actualizarPagina(n)}>
                  {n}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    ) : (
      <div className="container">
        <div className="spinner-grow text-primary" role="status" />
      </div>
    )}
  </div>
  );
};
