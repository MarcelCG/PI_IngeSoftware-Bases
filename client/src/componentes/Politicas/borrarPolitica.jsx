import axios from 'axios';
import { Modal } from '../Utiles/Modal';
import { ajustarFecha } from './verPolitica';
import { URLApi } from '../Compartido/Constantes';
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const BorrarPolitica = ({ politica, botonRef, setPolValores }) => {
 
  const AbrirAdver = () => {
    setPolValores({
      titulo: <strong>PELIGRO: Borrando Politica</strong>,
      componente: <div>¿Está seguro de que desea borrar la politica "<strong>{politica.titulo}</strong>"?</div>,
      modalID:"modalPol",
      tituloEstilos: "titulo-ventana-rojo"
      /* Aqui ale, deberia hacer algo como:
      boton: [como le quiera poner al boton]
      funcion: [manda como parametro la funciona que borra la politica]
      */
    });
    botonRef.current.click();
  };

  const borrar = () => {
    AbrirAdver();
  };

  return (
    <>
     <FontAwesomeIcon className="btn-danger" onClick={()=> borrar(politica)} icon={faTrash} />
    </>
  );
};