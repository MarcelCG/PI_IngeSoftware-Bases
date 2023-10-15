import React, { useContext, useState, useEffect } from 'react';

const ContextoAutenticacion = React.createContext();

export function useAutent(){
    return useContext(ContextoAutenticacion);;
}

export function ProveedorAutenticacion(props){
    // Obtener el valor almacenado en localStorage, si existe
    const contextoAlmacenado = JSON.parse(localStorage.getItem('contextoAutenticacion'));

    // Establecer el estado inicial con el valor de localStorage o el valor por defecto
    const [usuarioAutenticado, autenticarUsuario] = useState(contextoAlmacenado ? contextoAlmacenado.usuarioAutenticado : null);
    const [logeado, logear] = useState(contextoAlmacenado ? contextoAlmacenado.logeado : null);

    const value = {
        usuarioAutenticado,
        autenticarUsuario,
        logeado,
        logear
    }

    // Almacenar en localStorage cada vez que el contexto cambie
    useEffect(() => {
        localStorage.setItem('contextoAutenticacion', JSON.stringify(value));
    }, [value]);

    return (
        <ContextoAutenticacion.Provider value={value}>{props.children}</ContextoAutenticacion.Provider>
    )

}

