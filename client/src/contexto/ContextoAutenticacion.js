import React, { createContext, useContext, useState } from 'react';

const ContextoAutenticacion = React.createContext();

export function useAutent(){
    return useContext(ContextoAutenticacion);;
}

export function ProveedorAutenticacion(props){
    const [usuarioAutenticado, autenticarUsuario] = useState();
    const [logeado, logear] = useState();

    const value = {
        usuarioAutenticado,
        autenticarUsuario,
        logeado,
        logear
    }

    return (
        <ContextoAutenticacion.Provider value={value}>{props.children}</ContextoAutenticacion.Provider>
    )

}

