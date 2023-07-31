import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../index'
import queryString from 'query-string'



export const Perfil = () => {
    const navigate = useNavigate();
    const { dataUser } = useContext(AuthContext)

    const location = useLocation()
    const queryParams = queryString.parse(location.search)
  return (
    <>
      <div className="body21 login-register-page">
                <div className="wrapper21 register-container">
                    <div className="form-title">
                        <h1>Perfil</h1>
                    </div>
                    <form action="#">
                        <div className="main-user-info">
                            <div className="input-box1">
                                <label htmlFor="inputName">Full Name</label>
                                <input type="text" className='input1' id="inputName" placeholder="Enter your name" defaultValue={dataUser.name} name='name' readOnly />
                            </div>
                            <div className="input-box1">
                                <label htmlFor="inputUsername">Username</label>
                                <input type="text" className='input1' id="inputUsername" placeholder="Enter your username" defaultValue={queryParams.username || dataUser.username} name='username' readOnly />
                            </div>
                            <div className="input-box1">
                                <label htmlFor="inputEmail">Email</label>
                                <input type="email" className='input1' id="inputEmail" placeholder="Enter your email" defaultValue={queryParams.email || dataUser.email} name='email' readOnly />
                            </div>
                        </div>
                            <div className='form-submit-btn'>
                                <button type='submit' className='input1'  onClick={() => navigate(`/updateP/${dataUser.sub}`)}>Update</button>
                            </div>
                    </form>
                </div>
            </div>
    </>
  );
};
