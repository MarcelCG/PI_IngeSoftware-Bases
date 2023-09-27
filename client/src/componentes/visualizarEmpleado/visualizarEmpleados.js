import React, {useState, useEffect} from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/visualizarEmpleados.css"
import 'font-awesome/css/font-awesome.min.css';

const URI = 'http://localhost:3000/empleados/'

const ListOfEmployees = () => {

    const [empleados, setEmpleado] = useState([])
    useEffect(() => {
        getAllEmpleados()
    },[])

    const getAllEmpleados = async () => {
        const res = await axios.get(URI)
        setEmpleado(res.data)
    }
    console.log(empleados)

    return(
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <h3>Lista de Empleados</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <a href="" className="btn btn-success">Agregar</a>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inline float-md-right mb-3">
                                                <div className="search-box ml-2">
                                                    <div className="position-relative">
                                                        <input></input>
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
                                                    { empleados.map ( (empleado) => (
                                                        <tr>
                                                            <td className="col--5">{ empleado.cedula }</td>
                                                            <td className="col--5">{ empleado.nombre_completo }</td>
                                                            <td className="col--5">{ empleado.correo }</td>
                                                            <td className="col--5">{ empleado.rol }</td>
                                                            <td className="col--5">
                                                                <button className="btn btn-primary btn-sm">Ver/Editar</button>
                                                                <button className="btn btn-danger btn-sm">Eliminar</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
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
}

export default ListOfEmployees;