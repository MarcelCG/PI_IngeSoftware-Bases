import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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

export const Modal = (props) => {
  const {modalID, titulo, componente, boton, funcion} = props;
  return (
    <div>
      <div className="modal fade" id={modalID} tabIndex="-1" aria-labelledby="" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            {titulo &&
            <div className="modal-header">
              <h1 className="modal-title fs-5">{titulo}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>}
            {componente &&
            <div className="modal-body">
               {componente}
            </div>}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              {boton&&
              <button type="button" className="btn btn-primary" onClick={funcion}>boton</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}