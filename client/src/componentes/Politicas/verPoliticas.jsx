import axios from 'axios';
import {VerPoliticasHTML} from './verPoliticasHTML'
import {VerPolitica} from './verPolitica'
import { useAutent } from "../../contexto/ContextoAutenticacion";
import React, {useState, useEffect, useRef} from "react";
import { URLApi } from '../Compartido/Constantes';
import {editarPolitica} from './EditarPolitica';

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
        setCargando(true);
      } catch (error) {
        setCargando(true);
      }
    }
    cargarPoliticas();
  }, []);

  const modalID = "modalPol";
  const botonRef = useRef(null);
  const [Politicas, setPoliticas] = useState([]);
  const [cargando, setCargando]   = useState(true);
  const [paginaActual, actualizarPagina] = useState(1);
  const [polValores, setPolValores] = useState({
    titulo: "",
    componente: ""
  });

  // variables para la paginacion del GRID
  const politicasPorPag = 5;
  const ultimoInd = paginaActual * politicasPorPag;
  const primerInd = ultimoInd - politicasPorPag;
  const politicasAct = Politicas.slice(primerInd, ultimoInd);
  const numPag = Math.ceil(Politicas.length/politicasPorPag);
  const numeros = [...Array(numPag +1).keys()].slice(1)

  const abrirModalPolitica = (politica) => {
    setPolValores({
     ...polValores,
     titulo: politica.titulo,
     componente: <VerPolitica {...politica}/>});
    botonRef.current.click();
  };

    // Función para abrir el formulario de edición
    const manejoEditarPolitica = (politica) => {
      // Llama a la función para editar la política pasando la política como argumento
      editarPolitica(politica);
    };

  let props = {
    ...polValores,
    politicasAct,
    paginaActual,
    actualizarPagina,
    modalID,
    cargando,
    botonRef,
    abrirModalPolitica,
    numeros,
    esEmpleador,
    manejoEditarPolitica
  };

  return ( <VerPoliticasHTML {...props}/> );
};
