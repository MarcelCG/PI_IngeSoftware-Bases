import React, { useContext, useState, useEffect } from 'react';
import { URLApi } from '../componentes/Compartido/Constantes';
import axios from 'axios';

const ContextoAutenticacion = React.createContext();

export function useAutent(){
    return useContext(ContextoAutenticacion);;
}

const obtenerDatosUsuario = async (username, autenticarUsuario) => {
    try {
      const response = await axios.get(`${URLApi}usuario/byCedula/${username}`);
      const usuario = response.data;
  
      const cedulaEmpresa = await obtenerDatosEmpresa(username);
  
      autenticarUsuario({
        cedula: usuario.cedula,
        nombre: `${usuario.nombre} ${usuario.primer_apellido}`,
        cedula_empresa: cedulaEmpresa,
      });
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error.message);
    }
  };
  
  const obtenerDatosEmpresa = async (username) => {
    try {
      const response = await axios.get(`${URLApi}empresa/byCedulaEmpleador/${username}`);
      if (response.status === 200) {
        const empresa = response.data;
        const cedulaEmpresa = empresa.cedula_juridica;
        console.log(`La cédula de la empresa es: ${cedulaEmpresa}`);
        return cedulaEmpresa;
      } else {
        console.log("No se encontró la empresa");
        return '';
      }
    } catch (error) {
      console.error('Error al obtener los datos de la empresa:', error.message);
      return '';
    }
  };

export function ProveedorAutenticacion(props){
    // Obtener el valor almacenado en sessionStorage, si existe
    const contextoAlmacenado = JSON.parse(sessionStorage.getItem('contextoAutenticacion'));

    // Establecer el estado inicial con el valor de sessionStorage o el valor por defecto
    const [usuarioAutenticado, autenticarUsuario] = useState(contextoAlmacenado ? contextoAlmacenado.usuarioAutenticado : null);
    const [logeado, logear] = useState(contextoAlmacenado ? contextoAlmacenado.logeado : null);

    const value = {
        usuarioAutenticado,
        autenticarUsuario,
        logeado,
        logear,
        obtenerDatosUsuario
    }

    // Almacenar en sessionStorage cada vez que el contexto cambie
    useEffect(() => {
      sessionStorage.setItem('contextoAutenticacion', JSON.stringify({
        usuarioAutenticado,
        logeado,
      }));
    }, [usuarioAutenticado, logeado]);

    return (
        <ContextoAutenticacion.Provider value={value}>{props.children}</ContextoAutenticacion.Provider>
    )

}
