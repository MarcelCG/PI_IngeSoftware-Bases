import axios from 'axios';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import React, {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faTrash, faChevronRight, faChevronLeft  } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import BuscarEmpleados from './buscarEmpleados';
import { URLApi } from '../Compartido/Constantes';
import {BorrarEmpleado} from './borrarEmpleado';
import { Modal } from '../Utiles/Modal';
import {ModalAgregarEmpleado} from './agregarEmpleado'

const empleadoURI = URLApi + 'empleados/allByEmpresa/';

const ListOfEmployees = () => {

    const botonRef = useRef(null);

    const {usuarioAutenticado} = useAutent(); 

    const empresa = usuarioAutenticado.cedula_empresa;

    useEffect(() => {
        if (empresa) {
            const empleadosURIParam = empleadoURI + empresa;
            const getEmpleadoByEmpresa = async () => {
            try {
                const res = await axios.get(empleadosURIParam);
                console.log(empleadosURIParam);
                setEmpleado(res.data);
                filtrarEmpleados(res.data);
            } 
            catch (error) {
                console.error('Error al obtener datos de los empleados:', error);
            }
        };
        getEmpleadoByEmpresa();
        }
    }, [empresa]);

    const [empleados, setEmpleado] = useState([]);
        const [modal, setModal] = useState({modalID:"modalEmpleado"});
        const [empleadosFiltrados, filtrarEmpleados] = useState([]);
        const botonRef = useRef(null);
        const [currentPage, setCurrentPage] = useState(1);
        const recordsPerPage = 5;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const records = empleadosFiltrados.slice(firstIndex, lastIndex);
        const npage = Math.ceil(empleadosFiltrados.length/recordsPerPage);
        const numbers = [...Array(npage +1).keys()].slice(1)

    const [EmpleadoValores, setEmpleadoValores] = useState({
      titulo: "",
      componente: "",
      modalID:"modalEmpleado"
    });

    let props = {
      ...EmpleadoValores,
      BorrarEmpleado,
      botonRef,
      setEmpleadoValores,
      setEmpleado
    };

    return(
        <div className='container'>
            <Modal{...props}/>
            <div ref={botonRef} data-bs-toggle="modal" data-bs-target={`#${props.modalID}`}/>
            <div className="row mb-4 col-12 d-flex p-1 align-items-center">
                <div className='col-10'>
                    <BuscarEmpleados empleados={empleados} filtrarEmpleados={filtrarEmpleados}/>
                </div>
                <ModalAgregarEmpleado botonRef={botonRef} setModalValores={setModal} />
            </div>
            <div className="table-responsive mb-4">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th className="col--5" scope="col">Cedula</th>
                                <th className="col--5" scope="col">Nombre</th>
                                <th className="col--5" scope="col">Correo</th>
                                <th className="col--5" scope="col">Rol</th>
                                <th className="col--5" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { records.map ( (empleado, i) => (
                                <tr key={i}>
                                    <td className="col--5">{ empleado.cedula }</td>
                                    <td className="col--5">{ empleado.nombre_completo }</td>
                                    <td className="col--5">{ empleado.correo }</td>
                                    <td className="col--5">{ empleado.rol }</td>
                                    <td className="col--5 acciones">
                                        <button className="btn-primary me-2"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                        <BorrarEmpleado empleado={empleado} botonRef={botonRef} setEmpleadoValores={setEmpleadoValores} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link"
                                    onClick={prePage}><FontAwesomeIcon icon={faChevronLeft} /></button>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <button className='page-link'
                                        onClick={()=> changeCPage(n)}>{n}</button>
                                    </li>
                                ))
                            }
                            <li className="page-item">
                                <button className="page-link"
                                    onClick={nextPage}><FontAwesomeIcon icon={faChevronRight} /></button>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
    )
    function prePage() {
        if(currentPage !== 1) {
            setCurrentPage(currentPage-1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        if(currentPage !== npage) {
            setCurrentPage(currentPage+1)
        }
    }
}

export default ListOfEmployees;