import React from "react";
import axios from 'axios';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import { ToastContainer, toast } from 'react-toastify';
import { URLApi } from '../Compartido/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const URI = URLApi+'registrarEmpleado/';

const AddEmployee = () => {
  const {usuarioAutenticado} = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa;

  const navegar = useNavigate();
  
  const {register, handleSubmit, 
    formState: {errors},
    watch,
    reset
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.empresa = empresa;
      const response = await axios.post(URI, data);
      console.log('Solicitud POST exitosa:', response.data);
      toast.success('Empleado agregado con éxito', {
        position: toast.POSITION.TOP_RIGHT
      });
      reset();
    }
    catch (error) {
        console.log(error)
        if (error.response && error.response.status === 409
            && error.response.data 
            && error.response.data.message === 'Empleado ya existe') {
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
    }
  });

    return (
      <>
        
              <div className='card-header titulo-ventana'>
                  <h3 className='mt-2'>Registrar Empleado</h3>
              </div>
              <div className='card-body'>
                  <form className='px-4 row py-3' onSubmit={onSubmit}>
                      <div className='col-6'>
                          <div className='mt-2'>
                              <label htmlFor="cedula">Número de Cédula:</label>
                              <input type="text" 
                                  className={`form-control ${errors.cedula ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.cedula && <span className="text-danger">{errors.cedula.message}</span>}
                          <div className='mt-2'>
                              <label htmlFor="contrasena">Contraseña:</label>
                              <input type="password"
                                  className={`form-control ${errors.contrasena ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.contrasena && <span className="text-danger">{errors.contrasena.message}</span>}
                          <div className='mt-2'>
                              <label htmlFor="nombre">Nombre:</label>
                              <input type="text"
                                  className={`form-control ${errors.nombre ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                          <div className='mt-2'>
                              <label htmlFor="primer_apellido">Primer Apellido:</label>
                              <input type="text"
                                  className={`form-control ${errors.primer_apellido ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.primer_apellido && <span className="text-danger">{errors.primer_apellido.message}</span>}
                          <div className='mt-2'>
                              <label htmlFor="segundo_apellido">Segundo Apellido:</label>
                              <input type="text"
                                  className={`form-control ${errors.segundo_apellido ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.segundo_apellido && <span className="text-danger">{errors.segundo_apellido.message}</span>} 
                          <div className='mt-2'>
                              <label htmlFor="rol">Rol:</label>
                                  <input type="text"
                                  className={`form-control ${errors.rol ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.rol && <span className="text-danger">{errors.rol.message}</span>}
                      </div>
                      <div className='col-6'>
                          <div className='mt-2'>
                              <label htmlFor="telefono1">Número de teléfono:</label>
                                  <input type="text"
                                  className={`form-control ${errors.telefono1 ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.telefono1 && <span className="text-danger">{errors.telefono1.message}</span>}                      
                          <div className='mt-2'>
                              <label htmlFor="telefono2">Número de teléfono opcional:</label>
                                  <input type="text"
                                  className={`form-control ${errors.telefono2 ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.telefono2 && <span className="text-danger">{errors.telefono2.message}</span>}      
                          <div className='mt-2'>
                              <label htmlFor="correo1">Correo:</label>
                                  <input type="email"
                                  className={`form-control ${errors.correo1 ? ' is-invalid' : ''}`}
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
                          </div>
                          { errors.correo1 && <span className="text-danger">{errors.correo1.message}</span>} 
                          <div className='mt-2'>
                              <label htmlFor="correo2">Correo opcional:</label>
                                  <input type="email"
                                  className={`form-control ${errors.correo2 ? ' is-invalid' : ''}`}
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
                          </div> 
                          { errors.correo2 && <span className="text-danger">{errors.correo2.message}</span>}  
                          <div className='mt-2'>
                              <label htmlFor="fecha_contratacion">Fecha de Contratación:</label>
                              <input type="date"
                                  className={`form-control ${errors.fecha_contratacion ? ' is-invalid' : ''}`}
                                  {...register("fecha_contratacion", {
                                      required: true
                                  })}
                              />
                          </div>
                          { errors.fecha_contratacion && <span className="text-danger">La fecha de contratación es requerida</span>}
                      </div>
                      <div className='d-flex justify-content-end mt-3'>
                          <div className='align-items-right text-align-right float-right'>
                              <button className='btn btn-primary' type='submit'>Agregar</button>
                          </div>
                      </div>
                  </form>
              </div>
          
      <ToastContainer />
      </>
    )
}

export const ModalAgregarEmpleado = ({botonRef, setModalValores }) => {
  const abrir = () => {
    setModalValores({
      componente: <AddEmployee/ >,
      modalID:"modalEmpleados",
      tamanio:"modal-lg"});
    botonRef.current.click();
  };

  return (
    <button className="btn btn-primary col-2 continuar" onClick={abrir}>
      <FontAwesomeIcon icon={faPlus} />Agregar
    </button>
  );
};

export default AddEmployee