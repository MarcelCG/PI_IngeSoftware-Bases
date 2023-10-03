import {useForm} from 'react-hook-form'
import React from "react";
import { Alert, Toast } from 'react-bootstrap';
import axios from 'axios';
import "../styles/agregarEmpleado.css"
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URI = 'http://localhost:4223/api/registrarEmpleado/';

const AddEmployee = () => {

    const {register, handleSubmit, 
        formState: {errors},
        watch,
        reset
    } = useForm()

    const onSubmit = handleSubmit((data) => {
        axios.post(URI, data).then((response) => {
            console.log('Solicitud POST exitosa:', response.data)
            toast.success('Empleado agregado con exito', {
                position: toast.POSITION.TOP_RIGHT
            });
            reset()
        }).catch((error) => {
            if (error.response && error.response.status === 400
                && error.response.data 
                && error.response.data.error === 'Ya existe un usuario con la cedula digitada') {
                console.error(error.response.data.error, error);
                // Muestra una notificación de error
                toast.error('Ya existe un usuario con la cedula digitada', {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                console.error('Error en la solicitud POST:', error);
                // Muestra una notificación de error
                toast.error('Hubo un error inesperado al agregar el empleado, trate de nuevo', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        });
    });

    return (
        <>
        <div className='container col-5 position-static'>
            <div className='card border-dark shadow m-3'>
                <div className='card-header'>
                    <h3 className='mt-2'>Registrar Empleado</h3>
                </div>
                <div className='card-body'>
                    <form className='px-4 row py-3' onSubmit={onSubmit}>
                        <div className='col-6'>
                            <div className='mt-2'>
                                <label htmlFor="cedula">Numero de Cedula</label>
                                <input type="text" 
                                    {...register("cedula", {
                                        required: {
                                            value: true,
                                            message: "El numero de cedula es requerido"
                                        },
                                        pattern: {
                                            value: /^([1-9]-[0-9]{4}-[0-9]{4})$/,
                                            message: "El numero de cedula no es valido"
                                        }
                                    })} placeholder='1-2345-6789'
                                />
                                { errors.cedula && <span>{errors.cedula.message}</span>}
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="contrasena">Contraseña</label>
                                <input type="password"
                                    {...register("contrasena", {
                                        required: {
                                            value: true,
                                            message: "La contraseña es requerida"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener "
                                                    + "minimo 6 caracteres"
                                        }
                                    })}
                                />
                                { errors.contrasena && <span>{errors.contrasena.message}</span>}
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text"
                                    {...register("nombre", {
                                        required: {
                                            value: true,
                                            message: "El nombre es requerido"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "El nombre debe tener al "
                                                    + "menos 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "El nombre debe tener maximo "
                                            + "20 caracteres"
                                        }
                                    })}
                                />
                                { errors.nombre && <span>{errors.nombre.message}</span>}
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="primer_apellido">Primer Apellido</label>
                                <input type="text"
                                    {...register("primer_apellido", {
                                        required: {
                                            value: true,
                                            message: "El primer apellido es requerido"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "El primer apellido debe tener al "
                                                    + "menos 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "El primer apellido debe tener maximo "
                                            + "20 caracteres"
                                        }
                                    })}
                                />
                                { errors.primer_apellido && <span>{errors.primer_apellido.message}</span>}
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="segundo_apellido">Segundo Apellido</label>
                                <input type="text"
                                    {...register("segundo_apellido", {
                                        required: {
                                            value: true,
                                            message: "El segundo apellido es requerido"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "El segundo apellido debe tener al "
                                                    + "menos 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "El segundo apellido debe tener maximo "
                                            + "20 caracteres"
                                        }
                                    })}
                                />
                                { errors.segundo_apellido && <span>{errors.segundo_apellido.message}</span>} 
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="rol">Rol</label>
                                    <input type="text"
                                    {...register("rol", {
                                        required: {
                                            value: true,
                                            message: "El rol es requerido"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "El rol debe tener al "
                                                    + "menos 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "El rol debe tener maximo "
                                            + "30 caracteres"
                                        }
                                    })}
                                />
                                { errors.rol && <span>{errors.rol.message}</span>}
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='mt-2'>
                                <label htmlFor="telefono1">Numero de telefono</label>
                                    <input type="text"
                                    {...register("telefono1", {
                                        required: {
                                            value: true,
                                            message: "El numero de telefono es requerido"
                                        },
                                        pattern: {
                                            value: /^[24678][0-9]{3}-[0-9]{4}$/,
                                            message: "El numero de telefono no es valido"
                                        }
                                    })}
                                />
                                { errors.telefono1 && <span>{errors.telefono1.message}</span>}
                            </div>                      
                            <div className='mt-2'>
                                <label htmlFor="telefono2">Numero de telefono</label>
                                    <input type="text"
                                    {...register("telefono2", {
                                        pattern: {
                                            value: /^[24678][0-9]{3}-[0-9]{4}$/,
                                            message: "El numero de telefono no es valido"
                                        },
                                        validate: (value) => {
                                            if (watch('telefono1') == '' || watch('telefono1') != value) {
                                                return true
                                            } else {
                                                return "Los telefonos no pueden ser iguales"
                                            }
                                        }
                                    })} placeholder='Opcional*'
                                />
                                { errors.telefono2 && <span>{errors.telefono2.message}</span>}
                            </div>      
                            <div className='mt-2'>
                                <label htmlFor="correo1">Correo</label>
                                    <input type="email"
                                    {...register("correo1", {
                                    required: {    
                                        value: true,
                                        message: "El correo es requerido"
                                    },
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: "El correo no es valido"
                                    }
                                    })}
                                />
                                { errors.correo1 && <span>{errors.correo1.message}</span>}
                            </div> 
                            <div className='mt-2'>
                                <label htmlFor="correo2">Correo</label>
                                    <input type="email"
                                    {...register("correo2", {
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: "El correo no es valido"
                                    },
                                    validate: (value) => {
                                        if (watch('correo1') == '' || watch('correo1') != value) {
                                            return true
                                        } else {
                                            return "Los correos no pueden ser iguales"
                                        }
                                    }
                                    })} placeholder='Opcional*'
                                />
                                { errors.correo2 && <span>{errors.correo2.message}</span>}
                            </div>   
                            <div className='mt-2'>
                                <label htmlFor="fecha_contratacion">Fecha de Contratacion</label>
                                <input type="date"
                                    {...register("fecha_contratacion", {
                                        required: true
                                    })}
                                />
                                { errors.fecha_contratacion && <span>La fecha de contratacion es requerida</span>}
                            </div>    
                            <div className='mt-2'>
                                <label htmlFor="empleador">Empleador</label>
                                <input type="text" disabled/>
                            </div>
                        </div>
                        <div className='position-relative mt-3 '>
                            <button className='btn btn-danger me-2 justify-content-end float-right'>Cancelar</button>
                            <button className='btn btn-success' type='submit'>Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default AddEmployee