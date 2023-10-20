import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { URLApi } from '../Compartido/Constantes';
import BuscarEmpleados from './buscarEmpleados';

const empleadoURI = URLApi + 'empleados/allByEmpresa/';

const ListOfEmployees = () => {
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
    const [empleadosFiltrados, filtrarEmpleados] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = empleadosFiltrados.slice(firstIndex, lastIndex);
    const npage = Math.ceil(empleadosFiltrados.length/recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1)

    return(
        <div className="col-12">
            <div className="row mb-3 text-center titulo-pagina">
                    <h3>Lista de Empleados</h3>
            </div>
            <div className="row mb-2 col-12 d-flex p-1 align-items-center">
                <div className='col-10'>
                    <BuscarEmpleados empleados={empleados} filtrarEmpleados={filtrarEmpleados}/>
                </div>
                <Link to="/app/empleados/addEmpleados" className="btn btn-success col-2 m-0"><FontAwesomeIcon icon={faPlus} className="me-1" />Agregar</Link>
            </div>
            <hr></hr>
            <div className="table-responsive mb-4">
                    <table className="table">
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
                                        <button className="btn btn-primary me-2"><FontAwesomeIcon className='editar' icon={faPenToSquare} /></button>
                                        <button className="btn btn-danger"><FontAwesomeIcon className='borrar' icon={faTrash} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <a href="#" className="page-link"
                                    onClick={prePage}>Prev</a>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a href="#" className='page-link'
                                        onClick={()=> changeCPage(n)}>{n}</a>
                                    </li>
                                ))
                            }
                            <li className="page-item">
                                <a href="#" className="page-link"
                                    onClick={nextPage}>Next</a>
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