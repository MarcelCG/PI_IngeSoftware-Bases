import React from 'react';
import { Link } from 'react-router-dom';
import { useAutent } from '../contexto/ContextoAutenticacion';

function MenuContenido({ enlaces }) {
    const { usuarioAutenticado } = useAutent();
    const nombreUsuario = usuarioAutenticado.nombre;
  return (
    <div className="menu col-12 row mx-0">
        <ul className='col-5'>
            {enlaces.map((enlace, index) => (
            <li key={index}>
                <Link to={enlace.to}>{enlace.label}</Link>
            </li>
            ))}
        </ul>
        <Link className='col-2' to='/app'>
            <img className='img-fluid' src="/logo_oraculo_menu.png" alt='Logo Oraculo' />
        </Link>
        <Link className='col-5 perfil' to="/app/perfil">
            <img className='img-fluid' src='/user_icon.png' alt='Tu perfil' />
            <p className='mb-0'>{nombreUsuario}</p>
        </Link>
    </div>
  );
}

export function MenuEmpleador() {

  const enlaces = [
    { to: '/app', label: 'Inicio' },
    { to: '/app/empleados', label: 'Empleados' },
    { to: '/app/politicas', label: 'Políticas' },
    { to: '/app/empresa', label: 'Empresa' },
    { to: '/app/solicitudes', label: 'Solicitudes'}
  ];

  return (
      <MenuContenido enlaces={enlaces} />
  );
}

export function MenuEmpleado() {

  const enlaces = [
    { to: '/app', label: 'Inicio' },
    { to: '/app/perfil', label: 'Perfil' },
  ];

  return (
      <MenuContenido enlaces={enlaces} />
  );
}
