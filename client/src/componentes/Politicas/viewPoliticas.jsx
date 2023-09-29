import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const ViewPoliticas = ({items}) => {

  return (
    <div className="container bg-light shadow">
      <div className="row p-3">
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
	                  		<div className="col">Inicio: <strong>{item.inicio}</strong>
			                  </div>
			                  <div className="col">Final: <strong>{item.final}</strong>
			                  </div>
	                  	</div>
	                  	<div className="row">
	                  		<div className="col">Periodo: <strong>{item.periodo}</strong>
			                  </div>
			                  <div className="col">Acumulativo: <strong>{item.acumulativo}</strong>
			                  </div>
	                  	</div>
	                  	<div className="row">
	                  		<div className="col ">Horas a dar: <strong>{item.horas}</strong>
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
      </div>
    </div>
  );
};

