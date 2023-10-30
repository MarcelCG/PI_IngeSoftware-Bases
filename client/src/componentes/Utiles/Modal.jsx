import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
/* ---------------------------------------------------------------------------------------------------------------------
  │Explicacion:                                                                                                          │
  │  - Este en un template de Modal que podemos usar para no tener que escribir el codigo muchas veces                   │
  │    los props que de "desacoplan" son la variables que solo van a aparecer si estan se mandaron, ej:                  │
  │    si no viene un titulo entonces el espacio para el titulo no existira a la hora de usar el modal                   │
  │   modalID: valor unico para cada modal que ocupen, si es que necesitan varios                                        │
  │    componente: dentro del cuerpo del modal, pueden mandar su propio componente, por ejemplo: el formulario de Ulises │
  │    boton: el modal va traer el boton del modal por default de cerrar, pero si quieren anhadir otro boton pueden      │
  │    hacerlo mandando el nombre del boton y la funcion que quiere que se active al presionar tal boton                 │
  │                                                                                                                      │
  │   los demas son auto-explicativos 
   ---------------------------------------------------------------------------------------------------------------------*/

export const setModal = (setModalValores, props) => {
  setModalValores(props);
}

export const Modal = (props) => {

  const {modalID, titulo, tituloEstilos, componente, boton, funcion, tamanio, footer} = props;

 // useEffect(() => { }, [componente]);
  console.log(tituloEstilos);

  return (
    <div className={`modal fade ${tamanio}`} id={modalID} tabIndex="-1" aria-labelledby={modalID} aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          {titulo && (
            <div className={`modal-header ${tituloEstilos}`}>
              <h1 className="modal-title fs-5">{titulo}</h1>
              <button className="btn btn-light" data-bs-dismiss="modal" aria-label="Close">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>)}

          {tamanio === "modal-lg" ? 
          ( <> {componente} </>) : 
          ( <div className="modal-body">{componente}</div>)}

          <div className="modal-footer">
            {footer ? (
              footer
            ) : (
              <div>
                {boton && (
                  <button type="button" className="btn btn-primary btn-sm" onClick={funcion}>
                    {boton}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
