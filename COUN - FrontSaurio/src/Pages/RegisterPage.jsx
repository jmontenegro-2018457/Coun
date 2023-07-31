import React from 'react';
import axios from 'axios';
import "../CSS/Register.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

/*
  Componente funcional RegisterPage: representa la página de registro de nuevos usuarios.
*/
export const RegisterPage = () => {
  const navigate = useNavigate();

  // Obtener los datos del usuario desde el contexto de autenticación
  const { dataUser } = useContext(AuthContext);

  // Encabezados para las solicitudes HTTP que incluyen el token de autorización.
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  };

  // Estado local para el formulario de registro (form).
  const [form, setForm] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Función para registrar un nuevo usuario
  const register = async (e) => {
    try {
      const { data } = await axios.post(`https://coun-back-saurio.vercel.app/user/register`, form, { headers: headers });
  
      // Mostrar alerta de éxito utilizando sweetalert2 después del registro exitoso
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: data.message,
        confirmButtonText: 'Aceptar'
      });
  
      navigate('/Login'); // Navegar a la página de inicio de sesión después del registro exitoso.
    } catch (err) {
      // Mostrar mensaje de error si ocurre algún problema durante el registro.
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: err.response.data.message + ': También verifica que los parámetros, como la longitud del correo, sean correctos.',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  

  // Renderizar el formulario de registro
  return (
    <>
      <body className='body21 login-register-page'>
        <div className='wrapper21 register-container'>
          <form action="">

            <center><h1>Register</h1></center>

            <div className="input-box1">
              <input type="text"
                className='input1'
                onChange={handleChange}
                id="name"
                name="name"
                placeholder="Nombres" />
            </div>

            <div className="input-box1">
              <input type="text"
                className='input1'
                onChange={handleChange}
                id="surname"
                name="surname"
                placeholder="Apellidos" />
            </div>

            <div className="input-box1">
              <input type="text"
                className='input1'
                onChange={handleChange}
                id="username"
                name="username"
                placeholder="Usuario" />
            </div>

            <div className={`input-box1 ${showPassword ? 'show-password' : ''}`}>
              <input type={showPassword ? 'text' : 'password'}
                className='input1'
                onChange={handleChange}
                id="password"
                name="password"
                placeholder="Contraseña" />
              
            </div>
            <span // Botón para alternar la visibilidad de la contraseña.
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            <div className="input-box1">
              <input type="text"
                className='input1'
                onChange={handleChange}
                id="email"
                name="email"
                placeholder="Correo" />
            </div>

            <button type='submit' onClick={(e) => { e.preventDefault(); register(e) }} className='btn1 btn00'>Crear usuario</button>

          </form>
        </div>
      </body>
    </>
  )
}
