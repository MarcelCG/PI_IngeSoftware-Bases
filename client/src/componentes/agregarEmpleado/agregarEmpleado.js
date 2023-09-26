import {useForm} from 'react-hook-form'
import React from "react";
import "../styles/agregarEmpleado.css"
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const AddEmployee = () => {
    const {register, handleSubmit, 
        formState: {errors},
        reset
    } = useForm()

    console.log(errors)

    const onSubmit = handleSubmit((data) => {
        alert("Enviando datos...")

        reset()
    });

    return (
        <div className='d-flex justify-content-center align-items-center 100-w vh-100'>
            <div className='40-w p-5 rounded bg-white formBorder'>
                <h3>Registrar Empleado</h3>
                <hr  />
                <form className='row g-3' onSubmit={onSubmit}>
                    <div className='row g-3'>
                        <div className='col'>

                            <label htmlFor="cedula">Numero de Cedula</label>
                            <input type="text" 
                                {...register("cedula", {
                                    required: {
                                        value: true,
                                        message: "El numero de cedula es requerido"
                                    },
                                    pattern: {
                                        value: /^[1-9][0-9]{8}$/,
                                        message: "El numero de cedula no es valido"
                                    }
                                })}
                            />
                            { errors.cedula && <span>{errors.cedula.message}</span>}

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
                            { errors.nombre && <span>{errors.nombre.message}</span>}

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
                        <div className='col'>    

                            <label htmlFor="telefono">Numero de telefono</label>
                                <input type="text"
                                {...register("telefono", {
                                    required: {
                                        value: true,
                                        message: "El numero de telefono es requerido"
                                    },
                                    pattern: {
                                        value: /^[24678][0-9]{7}$/,
                                        message: "El numero de telefono no es valido"
                                    }
                                })}
                            />
                            { errors.telefono && <span>{errors.telefono.message}</span>}

                            <label htmlFor="correo">Correo</label>
                                <input type="email"
                                {...register("correo", {
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
                            { errors.correo && <span>{errors.correo.message}</span>}

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

                            <label htmlFor="fecha_contratacion">Fecha de Contratacion</label>
                            <input type="date"
                                {...register("fecha_contratacion", {
                                    required: true
                                })}
                            />
                            { errors.fecha_contratacion && <span>La fecha de contratacion es requerida</span>}
                            <label htmlFor="empleador">Empleador</label>
                            <input type="text" disabled/>
                        </div>
                    </div>
                    <button className='btn btn-primary btn-sm boton' type='submit'>Agregar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee