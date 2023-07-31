import React from 'react';
import logo from '../assets/logo.png';
import '../CSS/HomePage.css';

export const HomePage = () => {
  
  return (
    <>
      <body className="fade-in-animation body5mil">

        <div className="container1HP ">

          <div className="contenedorHP">
            <div>
              <img src={logo} alt="Person" className="hpIMG" />
            </div>

            <div className="containerHP">
              <h1 className="titulo"><b>COUN</b></h1>
              <br />
              <h2 className="">Sean bienvenidos a <b>COUN</b> <p><b>CO</b>nocimientos de las <b>UN</b>iversidades.</p></h2>
              <p className='pHP'>
                ¡Bienvenidos a COUN, tu fuente confiable de información sobre universidades y educación superior! Somos un equipo apasionado por brindar conocimientos valiosos para ayudarte en tu búsqueda de la educación adecuada. Ya sea que estés buscando información sobre universidades, maestrías, cursos o programas académicos, estás en el lugar indicado.
                En COUN, nos esforzamos por ofrecerte datos actualizados y detallados sobre diversas instituciones educativas y programas de estudio. Nuestro objetivo es facilitar el proceso de toma de decisiones, proporcionándote información precisa y relevante que te ayude a elegir el camino académico que mejor se adapte a tus intereses y metas profesionales.
              </p>
            </div>

          </div>


        </div>


      </body>
    </>
  );
};