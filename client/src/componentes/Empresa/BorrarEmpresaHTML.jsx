import axios from 'axios';
import _ from "lodash";
import EditarEmpresaHTML from './EditarEmpresaHTML'
import React, { useState } from 'react'
import {handleSubmit} from '../Registro/FormInput'
import { URLApi } from '../Compartido/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const BorrarEmpresaHTML = ({datosEmpresa, borrar, alternarModal}) => {
	return(
		<div>
			<p>Esta seguro que desea borrar la empresa: <br/>"<strong>{datosEmpresa.nombre||""}</strong>" ?</p>
			<b>Esta accion es irreversible.</b><br/>
			<p>
				-Se le notificara a todos los empleados que la empresa ha sido eliminada.
			</p>
			<div>
				<div className='align-items-right text-align-right float-right'>
					<button className="btn btn-secondary me-2">Atras</button>
					<button className="btn btn-primary">Siguiente</button>
				</div>
			</div>
		</div>
	);

};