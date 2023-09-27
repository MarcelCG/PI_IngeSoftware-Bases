import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/visualizarEmpleados.css"
import {useState, useEffect} from 'react'
import 'font-awesome/css/font-awesome.min.css';

const ListOfEmployees = () => {

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
                                                    <tr>
                                                        <td className="col--5">Hola</td>
                                                        <td className="col--5">Mark</td>
                                                        <td className="col--5">Otto</td>
                                                        <td className="col--5">@mdo</td>
                                                        <td className="col--5">
                                                            <button className="btn btn-primary">Ver/Editar</button>
                                                            <button className="btn btn-danger">Eliminar</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col--5">Hola</td>
                                                        <td className="col--5">Mark</td>
                                                        <td className="col--5">Otto</td>
                                                        <td className="col--5">@mdo</td>
                                                        <td className="col--5">
                                                            <button className="btn btn-primary">Ver/Editar</button>
                                                            <button className="btn btn-danger">Eliminar</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col--5">Hola</td>
                                                        <td className="col--5">Mark</td>
                                                        <td className="col--5">Otto</td>
                                                        <td className="col--5">@mdo</td>
                                                        <td className="col--5">
                                                            <button className="btn btn-primary">Ver/Editar</button>
                                                            <button className="btn btn-danger">Eliminar</button>
                                                        </td>
                                                    </tr>
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