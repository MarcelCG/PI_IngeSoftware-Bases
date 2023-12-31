import React from "react";
import { ToastContainer} from 'react-toastify';

const EditarPerfilEmpleadorHTML  = ({datosEmpleador,onSubmit,register,errors,watch,handleCancelClick}) => {
    return (
        <>
        <div className="mt-titulo">
            <div className='container col-5 position-static mt-5'>
            <div className='card border-dark shadow m-3'>
                    <div className='card-header'>
                        <h3 className='mt-2'>Editar Empleador</h3>
                    </div>
                    <div className='card-body'>
                        <form className='px-4 row py-3' onSubmit={onSubmit}>
                            <div className='col-6'>
                                <div className='mt-2'>
                                    <label htmlFor="cedula">Numero de Cedula</label>
                                    <input type="text" defaultValue={datosEmpleador.cedula}
                                        disabled
                                    />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" defaultValue={datosEmpleador.nombre}
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
                                    <input type="text" defaultValue={datosEmpleador.primer_apellido}
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
                                    <input type="text" defaultValue={datosEmpleador.segundo_apellido}
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
                            </div>
                            <div className='col-6'>
                                <div className='mt-2'>
                                    <label htmlFor="telefono1">Numero de telefono</label>
                                        <input type="text" defaultValue={datosEmpleador.telefono1}
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
                                    <label htmlFor="telefono2">Numero de telefono opcional</label>
                                        <input type="text" defaultValue={datosEmpleador.telefono2}
                                        {...register("telefono2", {
                                            pattern: {
                                                value: /^[24678][0-9]{3}-[0-9]{4}$/,
                                                message: "El numero de telefono no es valido"
                                            },
                                            validate: (value) => {
                                                if (watch('telefono1') === '' || watch('telefono1') !== value) {
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
                                        <input type="email" defaultValue={datosEmpleador.correo1}
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
                                    <label htmlFor="correo2">Correo opcional</label>
                                        <input type="email" defaultValue={datosEmpleador.correo2}
                                        {...register("correo2", {
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "El correo no es valido"
                                        },
                                        validate: (value) => {
                                            if (watch('correo1') === '' || watch('correo1') !== value) {
                                                return true
                                            } else {
                                                return "Los correos no pueden ser iguales"
                                            }
                                        }
                                        })} placeholder='Opcional*'
                                    />
                                    { errors.correo2 && <span>{errors.correo2.message}</span>}
                                </div>   
                            </div>
                            <div className='d-flex justify-content-end mt-3'>
                                <div className='align-items-right text-align-right float-right'>
                                    <button type='button'  className='btn btn-danger me-2' onClick={handleCancelClick}>Cancelar</button>
                                    <button className='btn btn-success' type='submit'>Agregar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    );
}

export default EditarPerfilEmpleadorHTML;
