import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const URI = 'http://localhost:5000/api/'
const empresaURI = URI + 'empresa/byCedulaEmpleador/'
const empleadoURI = URI + 'empleados/allByEmpresa/';

const ListOfEmployees = () => {
    const {usuarioAutenticado} = useAutent(); 
    const empresaURIParam = empresaURI + usuarioAutenticado.cedula;

    const [empresa, setEmpresa] = useState([]);

    useEffect(() => {
        const getEmpresaByCedulaEmpleador = async () => {
        try {
            const res = await axios.get(empresaURIParam);
            setEmpresa(res.data);
        } catch (error) {
            console.error('Error al obtener datos de la empresa:', error);
        }
    };
        getEmpresaByCedulaEmpleador();
    }, [empresaURIParam]);

    useEffect(() => {
        if (empresa.cedula_juridica) {
            const empleadosURIParam = empleadoURI + empresa.cedula_juridica;
            const getEmpleadoByEmpresa = async () => {
            try {
                const res = await axios.get(empleadosURIParam);
                setEmpleado(res.data);
            } 
            catch (error) {
                console.error('Error al obtener datos de los empleados:', error);
            }
        };
        getEmpleadoByEmpresa();
        }
    }, [empresa]);

  const [empleados, setEmpleado] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = empleados.slice(firstIndex, lastIndex);
    const npage = Math.ceil(empleados.length/recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1)

    return(
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <h3>Lista de Empleados</h3>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inline float-md-right mb-3">
                                                <div className="search-box ml-2">
                                                    <div className="position-relative">
                                                        <input className="me-3"></input>
                                                        <Link to={`/app/addEmpleados/${empresa}`} className="btn btn-success"><FontAwesomeIcon icon={faPlus} className="me-1" />Agregar</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="table-responsive mb-4">
                                        <div>
                                            <table className="table table-striped">
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
                                                            <td className="col--5">
                                                                <button className="btn btn-primary me-2"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                                <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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