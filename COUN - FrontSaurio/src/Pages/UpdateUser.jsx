import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../index';

export const UpdateUser = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const { id } = useParams();

  const { dataUser } = useContext(AuthContext)

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  };

  const getUser = async () => {
    try {
      const { data } = await axios(`https://coun-back-saurio.vercel.app/user/get/${id}`, { headers: headers })
      setUser(data.user)
    } catch (err) {
      console.error(err)
    }
  }

  const update = async (e) => {
    try {
      let updatedUser = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
      }

      const { data } = await axios.put(`https://coun-back-saurio.vercel.app/user/update/${id}`, updatedUser, { headers: headers })
      alert(`${data.message}`)

    } catch (err) {

      alert(err.response.data.message + ': Check that the parameters such as the email are correct')


    }
  }

  useEffect(() => getUser, [])

  return (
    <>
      <body className='body21 login-register-page'>
        <div className='wrapper21 register-container'>
            <h1 className="form-title">Update User</h1>
            <form action="#" className='row'>
              <div className="main-user-info ">
              <div className="input-box1">
                  <label htmlFor="name">Name</label>
                  <input type="text" 
                  className='input1'
                    defaultValue={user.name}
                    id="name"
                    name="name"
                    placeholder="Enter Name" />
                </div>
                
                <div className="input-box1">
                  <label htmlFor="username">Username</label>
                  <input type="text"
                  className='input1'
                    defaultValue={user.username}
                    id="username"
                    name="username"
                    placeholder="Enter Username" />
                </div>
                <div className="input-box1">
                  <label htmlFor="email">Email</label>
                  <input type="email"
                  className='input1'
                    defaultValue={user.email}
                    id="email"
                    name="email"
                    placeholder="Enter Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required aria-required />
                </div>
                <div className="input-box1">
                  <label htmlFor="role">Role</label>
                  {
                    dataUser.role == 'ADMIN' ? (
                      <>
                        <select
  className='input1'
  defaultValue={user.role}
  name="role"
  id='role'
  style={{
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #Dark',
    color: '#Black',
    outline: 'none',
    cursor: 'pointer',
  }}
>
  <option value='USER' style={{color: 'black'}}>USER</option>
  <option value="ADMIN" style={{color: 'black'}}>ADMIN</option>
</select>

                      </>) : <></>
                  }
                </div>
              </div>
              <div className="form-submit-btn">
                <input type="submit" onClick={() => update()} value="Update" />
                <Link style={{ textDecoration: 'none' }} to="/Users" className='col'>
                  <input type="submit" className='' value="Cancel" />
                </Link>
              </div>
            </form>
          </div>
        </body>

    </>
  )
}