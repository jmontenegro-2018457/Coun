import React from 'react';
import axios from 'axios';
import "../CSS/Login.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../index';
import Swal from 'sweetalert2';

/**
 * Componente funcional Login: página de inicio de sesión.
 */
export const LoginPage = () => {
  const { setLoggedIn, setDataUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  /**
   * Maneja el cambio en los campos del formulario de inicio de sesión.
   * @param {Object} e - Evento de cambio.
   */
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Realiza la operación de inicio de sesión al enviar el formulario.
   * @param {Object} e - Evento de envío de formulario.
   */
  const login = async (e) => {
    try {
      e.preventDefault(); // Evitar envío del formulario y recarga de página
  
      // Realizar la petición al backend para iniciar sesión
      const { data } = await axios.post('https://coun-back-saurio.vercel.app/user/login', credentials);
  
      // Si el inicio de sesión es exitoso, actualizar el estado global y redirigir a la página principal
      if (data.token) {
        setLoggedIn(true);
        localStorage.setItem('token', data.token);
        setDataUser({
          name: data.userLogged.name,
          username: data.userLogged.username,
          role: data.userLogged.role
        });
  
        navigate('/');
  
        // Mostrar alerta de éxito utilizando sweetalert2
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }

      
    } catch (err) {
      // Mostrar alerta de error utilizando sweetalert2
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: err.response.data.message,
        confirmButtonText: 'Aceptar'
      });
    }
  };
  

  return (
    <>
      <body className='body20 login-register-page'>
        <div className='wrapper login-container'>
          <form action="">

            <center><h1>LogIn</h1></center>

            <div className='input-box1'>
              <input className='input1' type="text" name='username' id="username" onChange={handleChange} placeholder='username' required />
              <i className="fa-solid fa-user" ></i>
            </div>

            <div className='input-box1'>
              <input className='input1 ' type="password" name='password' id="password" onChange={handleChange} placeholder='password' required />
              <i className="fa-solid fa-lock "></i>
            </div>

            
            <div className='input-box1'>
            <button type='submit' onClick={login} className='btn1'>Iniciar sesión</button>
            </div>
            <div className='register-link'>
              <p>¿Aún no creas tu cuenta? <Link to="/Register">Registrarse</Link></p>
            </div>

          </form>
        </div>
      </body>
    </>
  );
};
