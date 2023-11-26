import React from "react";
import { ToastContainer} from 'react-toastify';

const EditarPerfilHTML  = ({datosEmpleador,onSubmit,register,errors,watch}) => {
    return (
        <>
            <div className='card-body'>
                <form className='px-4 row py-3' onSubmit={onSubmit}>
                    <div className='col-6'>
                        <div className='mt-2'>
                            <label htmlFor="cedula">Numero de Cedula</label>
                            <input
                                type="text"
                                defaultValue={datosEmpleador.cedula}
                                disabled
                                className={`form-control ${errors.cedula ? ' is-invalid' : ''}`}
                            />
                        </div>
                        {errors.cedula && <span className="text-danger">{errors.cedula.message}</span>}
                        <div className='mt-2'>
                            <label htmlFor="contrasena">Contraseña</label>
                            <input
                                type="password"
                                defaultValue={datosEmpleador.contrasena}
                                {...register("contrasena", {
                                    required: {
                                        value: true,
                                        message: "La contraseña es requerida",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres",
                                    },
                                })}
                                className={`form-control ${errors.contrasena ? ' is-invalid' : ''}`}
                            />
                            {errors.contrasena && <span className="text-danger">{errors.contrasena.message}</span>}
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                defaultValue={datosEmpleador.nombre}
                                {...register("nombre", {
                                    required: {
                                        value: true,
                                        message: "El nombre es requerido",
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "El nombre debe tener al menos 2 caracteres",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "El nombre debe tener máximo 20 caracteres",
                                    },
                                })}
                                className={`form-control ${errors.nombre ? ' is-invalid' : ''}`}
                            />
                            {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="primer_apellido">Primer Apellido</label>
                            <input
                                type="text"
                                defaultValue={datosEmpleador.primer_apellido}
                                {...register("primer_apellido", {
                                    required: {
                                        value: true,
                                        message: "El primer apellido es requerido",
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "El primer apellido debe tener al menos 2 caracteres",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "El primer apellido debe tener máximo 20 caracteres",
                                    },
                                })}
                                className={`form-control ${errors.primer_apellido ? ' is-invalid' : ''}`}
                            />
                            {errors.primer_apellido && <span className="text-danger">{errors.primer_apellido.message}</span>}
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="segundo_apellido">Segundo Apellido</label>
                            <input
                                type="text"
                                defaultValue={datosEmpleador.segundo_apellido}
                                {...register("segundo_apellido", {
                                    required: {
                                        value: true,
                                        message: "El segundo apellido es requerido",
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "El segundo apellido debe tener al menos 2 caracteres",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "El segundo apellido debe tener máximo 20 caracteres",
                                    },
                                })}
                                className={`form-control ${errors.segundo_apellido ? ' is-invalid' : ''}`}
                            />
                            {errors.segundo_apellido && <span className="text-danger">{errors.segundo_apellido.message}</span>}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='mt-2'>
                            <label htmlFor="telefono1">Numero de telefono</label>
                            <input
                                type="text"
                                defaultValue={datosEmpleador.telefono1}
                                {...register("telefono1", {
                                    required: {
                                        value: true,
                                        message: "El numero de telefono es requerido",
                                    },
                                    pattern: {
                                        value: /^[24678][0-9]{3}-[0-9]{4}$/,
                                        message: "El numero de telefono no es valido",
                                    },
                                })}
                                className={`form-control ${errors.telefono1 ? ' is-invalid' : ''}`}
                            />
                            {errors.telefono1 && <span className="text-danger">{errors.telefono1.message}</span>}
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="telefono2">Numero de telefono (opcional)</label>
                            <input
                                type="text"
                                defaultValue={datosEmpleador.telefono2}
                                {...register("telefono2", {
                                    pattern: {
                                        value: /^[24678][0-9]{3}-[0-9]{4}$/,
                                        message: "El numero de telefono no es valido",
                                    },
                                    validate: (value) => {
                                        if (watch('telefono1') === '' || watch('telefono1') !== value) {
                                            return true;
                                        } else {
                                            return "Los telefonos no pueden ser iguales";
                                        }
                                    },
                                })}
                                placeholder='Opcional*'
                                className={`form-control ${errors.telefono2 ? ' is-invalid' : ''}`}
                            />
                            {errors.telefono2 && <span className="text-danger">{errors.telefono2.message}</span>}
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="correo1">Correo</label>
                            <input
                                type="email"
                                defaultValue={datosEmpleador.correo1}
                                {...register("correo1", {
                                    required: {
                                        value: true,
                                        message: "El correo es requerido",
                                    },
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: "El correo no es valido",
                                    },
                                })}
                                className={`form-control ${errors.correo1 ? ' is-invalid' : ''}`}
                            />
                            {errors.correo1 && <span className="text-danger">{errors.correo1.message}</span>}
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="correo2">Correo (opcional)</label>
                            <input
                                type="email"
                                defaultValue={datosEmpleador.correo2}
                                {...register("correo2", {
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: "El correo no es valido",
                                    },
                                    validate: (value) => {
                                        if (watch('correo1') === '' || watch('correo1') !== value) {
                                            return true;
                                        } else {
                                            return "Los correos no pueden ser iguales";
                                        }
                                    },
                                })}
                                placeholder='Opcional*'
                                className={`form-control ${errors.correo2 ? ' is-invalid' : ''}`}
                            />
                            {errors.correo2 && <span className="text-danger">{errors.correo2.message}</span>}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <div className='align-items-right text-align-right float-right'>
                            <button className='btn btn-primary' type='submit'>Guardar Cambios</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default EditarPerfilHTML;