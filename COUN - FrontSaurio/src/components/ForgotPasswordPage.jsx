import React, { useState } from 'react';
import axios from 'axios';

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const { dataUser } = useContext(AuthContext);
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            // Enviar solicitud al backend para el proceso de recuperación de contraseña
            const { data } = await axios.post('https://coun-back-saurio.vercel.app/forgotPassword/forgot-password', { email });
            alert(data.message);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <div>
            <h1>Recuperar Contraseña</h1>
            <form onSubmit={handleResetPassword}>
                <label>
                    Correo electrónico:
                    <input type="email" name="email" value={email} onChange={handleChange} required />
                </label>
                <button type="submit">Enviar Enlace de Recuperación</button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;