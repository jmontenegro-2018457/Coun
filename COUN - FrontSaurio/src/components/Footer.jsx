import React from 'react';
import '../CSS/Footer.css';

const logoW = { color: "white" };

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container12">
        <div className="footer-content">
          <h3 className="footer-logo"><a href="#" className="logo">DeveloperSaurios</a></h3>
          <div className="social-icons">
            <a className="btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-facebook-f" style={logoW}></i>
            </a>
            <a className="btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-twitter" style={logoW}></i>
            </a>
            <a className="btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-google" style={logoW}></i>
            </a>
            <a className="btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-instagram" style={logoW}></i>
            </a>
            <a className="btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-linkedin-in" style={logoW}></i>
            </a>
            <a className="btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-github" style={logoW}></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center p-3">
        © 2023 DeveloperSaurios. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

