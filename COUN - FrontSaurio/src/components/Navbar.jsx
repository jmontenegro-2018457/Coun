import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../index';
import logo from '../assets/logo.png';
import '../../src/CSS/Navbar.css';

const NavBar = () => {
  const { dataUser } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);

    const _id = dataUser ? dataUser.sub : null;

    const logOut = () => {
        localStorage.clear();
        localStorage.clear();
        window.location.reload();
    };

    const getUserLogged = () => {
        const token = localStorage.getItem("token");
        if (token && dataUser) {
            setLoggedIn(true);
        }
    };

    useEffect(() => {
        getUserLogged();
    }, [dataUser]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="70" height="70" alt="" />
          <h1>COUN</h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <h3>Inicio</h3>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/Universidades" className="nav-link">
                <h3>Universidades</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Ranking" className="nav-link">
                <h3>Ranking</h3>
              </Link>
            </li>
            {
                            dataUser.role == 'ADMIN' ? (
                                <>
                                    <li className="nav-item">
                                        <Link to='/Users' className="nav-link">
                                            <h3>Usuarios</h3>
                                        </Link>
                                    </li>

                                </>
                            ) : <></>
                        }
          </ul>

          <ul className="navbar-nav mb-lg-0">
        {loggedIn && dataUser ? (
          <>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bienvenido, {dataUser.name}, {dataUser.role}
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                {/* <li><Link to={`/UpdateP/${_id}`} className="dropdown-item">Actualizar</Link></li> */}
                <Link to="/Perfil" className="nav-link">
                  <p className="h5">&nbsp; Perfil</p>
                </Link>
                <Link to="/Login" className="nav-link" onClick={() => logOut()}>
                  &nbsp; LogOut
                </Link>
              </ul>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/Login" className="nav-link">
              LogIn
            </Link>
          </li>
        )}
      </ul>
        </div>
      </div>
    </nav>

  );
};

export default NavBar;
