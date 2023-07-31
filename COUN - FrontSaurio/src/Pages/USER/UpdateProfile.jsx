import React, { useContext, useState } from 'react'
import { AuthContext } from '../../index'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'

export const UpdateProfile = () => {

    const logOut = () => {
        localStorage.clear();
        
      };

    const navigate = useNavigate();
    const { dataUser } = useContext(AuthContext)

    const [tableUserInfo, setTbleUserInfo] = useState([{}])
    const { id } = useParams();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    };

    const getAccount = async () => {
        try {
            const { data } = await axios(`https://coun-back-saurio.vercel.app/user/get/${id}`, {headers})
            setTbleUserInfo(data.user)
        } catch (e) {
            console.log(e);
        }
    }

    const updateAccountUser = async () => {
        try {
            let updatedAccountUser = {
                username: document.getElementById('inputUsername').value,
                email: document.getElementById('inputEmail').value,
            }
            const { data } = await axios.put(`https://coun-back-saurio.vercel.app/user/update/${id}`, updatedAccountUser, {headers: headers})
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            navigate(`/Perfil?username=${updatedAccountUser.username}&email=${updatedAccountUser.email}&phone=${updatedAccountUser.phone}`)
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => getAccount, [])

    return (
        <>
            <div className="body21 login-register-page">
                <div className="wrapper21 register-container">
                    <div className="form-title">
                        <h1>Update</h1>
                    </div>
                    <form action="#">
                        <div className="main-user-info ">
                            <div className="input-box1">
                                <label htmlFor="inputUsername">Username</label>
                                <input type="text" className='input1' id="inputUsername" placeholder="Enter your username" defaultValue={tableUserInfo.username} name='username' />
                            </div>
                            <div className="input-box1">
                                <label htmlFor="inputEmail">Email</label>
                                <input type="email" className='input1' id="inputEmail" placeholder="Enter your email" defaultValue={tableUserInfo.email} name='email' />
                            </div>
                        </div>
                        <div className='form-submit-btn'>
                            <div className="row">
                                <div className="col">
                                <button type='submit' className='input1' onClick={() =>{ updateAccountUser(); navigate('/Perfil')}}>Confirm</button>
                                </div>
                                <div className="col" >
                                    <button type='submit' className='input1' onClick={() => navigate('/Perfil')} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}