import { useState, useEffect } from "react";
import { User } from './User'
import '../../src/CSS/Table.css';
import axios from "axios";
import NavBar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'

export const Table = () => {
  const [users, setUsers] = useState([{}])
  const navigate = useNavigate()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async () => {
    try {
      const { data } = await axios(`https://coun-back-saurio.vercel.app/user/getUser`, { headers: headers })
      setUsers(data.users)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUser = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this user?')
      if (confirmDelete) {
        const { data } = await axios.delete(`https://coun-back-saurio.vercel.app/user/delete/${id}`, { headers: headers })
        console.log(data)
        alert(`${data.message}`)
        getUsers();
      }
    } catch (err) {
      console.error(err)
    }
  }

  const navigateToAdd = async () => {
    try {
      navigate('/Register')
    } catch (err) {

    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container-fluid12">
        <div className="table-responsive table-sm">
          <center>
            <h1 className="table-title text-dark">Usuarios</h1>
            <button onClick={() => navigateToAdd()} className="add-user-button">
              Agregar Usuario
            </button>
          </center>
          <br /><br /><br />

          <table className="table table-dark table-hover custom-purple-table">
            <thead className="table-success border-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                users.map(({ _id, name, username, email, role }, index) => {
                  return (
                    <tr key={index}>

                      <User
                        name={name}
                        username={username}
                        email={email}
                        role={role}
                      ></User>

                      <td>
                        <Link className="btn8 text-white" to={`/UpdateU/${_id}`}>
                          <i class="fa-fw fa fa-pencil-alt"></i>
                        </Link>
                        <br />
                        <div onClick={() => deleteUser(_id)} className="btn8 ">
                          <i class="fa-solid fa-trash"></i>
                        </div>
                      </td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default Table;