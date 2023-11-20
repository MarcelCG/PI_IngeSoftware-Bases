import axios from 'axios';
import {VerPoliticasHTML} from './verPoliticasHTML'
import {VerPolitica} from './verPolitica'
import { useAutent } from "../../contexto/ContextoAutenticacion";
import React, {useState, useEffect, useRef} from "react";
import { URLApi } from '../Compartido/Constantes';
import { setModal } from '../Utiles/Modal';
import EditarPolitica from './EditarPolitica';

export const VerPoliticas = () => {

  const {usuarioAutenticado} = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa; 
  const esEmpleador = usuarioAutenticado?.esEmpleador ? true : false;
  
  useEffect(() => {
    async function cargarPoliticas() {
      try {
        const respuesta = await axios.get(
          `${URLApi}politicas/byCedula/${empresa}`);
          setPoliticas(respuesta.data);
          filtrarPoliticas(respuesta.data);
        setCargando(true);
      } catch (error) {
        setCargando(true);
      }
    }
    cargarPoliticas();
  }, []);

  //const modalID = "modalPol";
  const botonRef = useRef(null);
  const [politicas, setPoliticas] = useState([]);
  const [politicasFiltradas, filtrarPoliticas] = useState([]); 
  const [cargando, setCargando]   = useState(true);
  const [paginaActual, actualizarPagina] = useState(1);
  const [polValores, setPolValores] = useState({
    titulo: "",
    componente: "",
    modalID:"modalPol"
  });

  // variables para la paginacion del GRID
  const politicasPorPag = 5;
  const ultimoInd = paginaActual * politicasPorPag;
  const primerInd = ultimoInd - politicasPorPag;
  const politicasAct = politicasFiltradas.slice(primerInd, ultimoInd);
  const numPag = Math.ceil(politicasFiltradas.length/politicasPorPag);
  const numeros = [...Array(numPag +1).keys()].slice(1)

  const abrirModalPolitica = (politica) => {
    setPolValores({
     titulo: politica.titulo,
     componente: <VerPolitica {...politica}/>,
     modalID: "modalPol",
     tituloEstilos: "text-bg-secondary"});
    botonRef.current.click();
  };

  let props = {
    ...polValores,
    politicasAct,
    paginaActual,
    actualizarPagina,
    cargando,
    botonRef,
    abrirModalPolitica,
    numeros,
    esEmpleador,
    setPolValores, //nuevo
    politicas,
    filtrarPoliticas,
  };

  return ( <VerPoliticasHTML {...props}/> );
};


// roadblock