import React from "react"
import { Link } from "react-router-dom"
import '../../CSS/istmocartas.css'
import '../../CSS/cardsF.css'
import '../../CSS/stars.css'
import { useEffect, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StarRating";
import { AuthContext } from "../../index";

export const Istmo = () => {
  const MAX_STARS = 10;
  const { name } = useParams();
  const [university, setUniversity] = useState(null);
  const [universityId, setUniversityId] = useState(null);
  const [rating, setRating] = useState(0);
  const [calificarInicial, setCalificarInicial] = useState(true);
  const [calificando, setCalificando] = useState(false);
  const { dataUser } = useContext(AuthContext);

  const getUniversity = async () => {
    try {
      const { data } = await axios(`https://coun-back-saurio.vercel.app/university/getByName/${name}`);
      setUniversity(data);
      setUniversityId(data.university._id);
      setRating(data.averageRating);
    } catch (err) {
      console.log(err);
    }
  };

  function abrirEnNuevaPestana(urls) {
    urls.forEach((url) => {
      window.open(url, "_blank");
    });
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  };

  useEffect(() => {
    getUniversity();
  }, [name]);

  const handleCalificarClick = () => {
    if(calificando == false){
      setCalificando(true);
    }else{
      setCalificando(false);
    }
    
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const addVote = async (universityId, userId, rating) => {
    try {
      const response = await axios.post("https://coun-back-saurio.vercel.app/university/vote", {
        universityId,
        userId,
        stars: rating,
      }, {headers});
      getUniversity();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddVote = () => {
    addVote(universityId, dataUser.sub, rating);
    setCalificando(false);
  };
  
//-------------------------------------------
  const urls = [
    "https://unis.edu.gt/facultad-de-arquitectura-y-diseno/",
    "https://unis.edu.gt/facultad-de-ciencias-economicas-y-empresariales/",
    "https://unis.edu.gt/facultad-de-comunicacion/",
    "https://unis.edu.gt/facultad-de-derecho/",
    "https://unis.edu.gt/facultad-de-humanidades/",
    "https://unis.edu.gt/facultad-de-ingenieria/"
  ];

  const handleClick = (url) => {
    abrirEnNuevaPestana([url]);
  };



  return (
    <>
       <div className="containerRegresar">
        <Link to="/Universidades">
          <button className="btnRegresar"><i class="fa-solid fa-arrow-left"></i></button>
        </Link>
      </div>

      <div className="UsacContainer fade-in-animation">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="" width={'300vw'} height={'300vh'} />
        <div className="TitulosUSAC">
          <h1 className="cssFont_2">UNIVERSIDAD DEL ISTMO</h1>
          <p className="cssFont_3">Saber para servir</p>
          <p className="cssFont_4">Mensualidad: Ronda de Q3696 a Q5508 dependiendo la carrera</p>
          <div>
          {calificando ? ( // Mostrar estrellas solo cuando se está calificando
          <>
            <StarRating
              rating={rating}
              maxStars={MAX_STARS}
              readOnly={!calificando}
              onChangeRating={handleRatingChange}
            />
            <p>Valoración: {rating} de {MAX_STARS}</p>
            <button className="btn0" onClick={handleAddVote}>
              Enviar Calificación
            </button>
            <button className="btn0" onClick={handleCalificarClick}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <StarRating
              rating={rating}
              maxStars={MAX_STARS}
              readOnly={!calificando}
              onChangeRating={handleRatingChange}
            /><p>Valoración: {rating} de {MAX_STARS}</p>
            <button className="btn0" onClick={handleCalificarClick}>
              Calificar
            </button>
          </>
        )}


        
            &nbsp;
            <Link to={`/Comentarios/${universityId}`}> 
              <button className="btn0">Comentarios</button>
            </Link>

          </div>
        </div>
      </div>

      <div className="body4mil fade-in-animation">
        <center> <h1 class="cssFont_2" >FACULTADES</h1></center>
      </div>

      <div class="container3mil fade-in-animation">

        <div class="Facultades">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="Person" class="FacultadIMG" />
          <center>
            <p class="containerTitle">Facultad de Arquitectura y Diseño</p>
          </center>
          <div class="card_content3mil">
            <div class="containerText">
              <p class="containerParr">La Facultad de Arquitectura y Diseño de la Universidad del Istmo de Guatemala es un centro 
              académico líder en la formación de profesionales creativos y altamente capacitados en las áreas de arquitectura y diseño. Ubicada en un campus moderno y equipado, 
              la facultad se destaca por su compromiso con la excelencia académica, la innovación y el desarrollo sostenible.</p>
            </div>
            <div class="btn-container">
              <button onClick={() => handleClick(urls[0])} class="btn draw-border">Información</button>
            </div>
          </div>
        </div>

        <div class="Facultades">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="Person" class="FacultadIMG" />
          <center>
            <p class="containerTitle">Facultad de Ciencias Económicas</p>
          </center>
          <div class="card_content3mil">
            <div class="containerText">
              <p class="containerParr">La Facultad de Ciencias Económicas de la Universidad del Istmo de Guatemala es un prestigioso centro académico dedicado a la formación de 
              profesionales altamente capacitados en el campo de la economía y las ciencias financieras. Con una sólida trayectoria y un enfoque en la excelencia académica, esta 
              facultad se posiciona como líder en la región por la calidad de sus programas y la preparación de sus egresados.</p>
            </div>
            <div class="btn-container">
              <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
            </div>
          </div>
        </div>

        <div class="Facultades">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="Person" class="FacultadIMG" />
          <center>
            <p class="containerTitle">Facultad de Comunicación</p>
          </center>
          <div class="card_content3mil">
            <div class="containerText">
              <p class="containerParr">La Facultad de Comunicación de la Universidad del Istmo de Guatemala es una institución educativa líder en la formación de profesionales en 
              el campo de la comunicación. Reconocida por su excelencia académica y enfoque en la práctica, esta facultad se destaca por brindar a los estudiantes las herramientas 
              necesarias para sobresalir en diversos medios de comunicación y desarrollarse como comunicadores integrales.</p>
            </div>
            <div class="btn-container">
              <button onClick={() => handleClick(urls[2])} class="btn draw-border">Información</button>
            </div>
          </div>
        </div>

      </div>

      <br />

      <div class="container3mil fade-in-animation">

        <div class="Facultades">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="Person" class="FacultadIMG" />
          <center>
            <p class="containerTitle">Facultad de Derecho</p>
          </center>
          <div class="card_content3mil">
            <div class="containerText">
              <p class="containerParr"> El Consejo de Facultad de Derecho es el órgano colegiado encargado de la toma de decisiones relacionadas con los asuntos de interés de alumnos 
              y de la Facultad en general. Se encuentra conformado por profesionales del mundo académico y empresarial, con el objetivo de crear un puente entre la demanda del mercado laboral y la oferta académica de la Universidad.</p>
            </div>
            <div class="btn-container">
              <button onClick={() => handleClick(urls[3])} class="btn draw-border">Información</button>
            </div>
          </div>
        </div>

        <div class="Facultades">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="Person" class="FacultadIMG" />
          <center>
            <p class="containerTitle">Facultad de Humanidades</p>
          </center>
          <div class="card_content3mil">
            <div class="containerText">
              <p class="containerParr">El Consejo de Facultad de Humanidades se encarga de velar por que se viva la colegialidad en las decisiones; la unidad con el Consejo Directivo, 
              en el Consejo de Facultad mismo, entre la Facultad y con las demás dependencias de la Universidad. Nuestro equipo en la Facultad trata siempre de mantener una estrecha comunicación con cada uno de los alumnos para conocerlos y apoyarles para ayudar a los demás a superar sus retos.</p>
            </div>
            <div class="btn-container">
              <button onClick={() => handleClick(urls[4])} class="btn draw-border">Información</button>
            </div>
          </div>
        </div>

        <div class="Facultades">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="Person" class="FacultadIMG" />
          <center>
            <p class="containerTitle">Facultad de Ingenieria</p>
          </center>
          <div class="card_content3mil">
            <div class="containerText">
              <p class="containerParr">El Consejo de Facultad de Ingeniería se encarga de velar por que se viva la colegialidad en las decisiones; la unidad con el 
              Consejo Directivo, en el Consejo de Facultad mismo, entre la Facultad y con las demás dependencias de la Universidad. En la UNIS te conocemos, no eres un número, nos preocupamos por saber quién eres, qué te apasiona y cuáles son tus intereses, para lograr esto, todo nuestro equipo en la Facultad trata siempre de mantener una estrecha comunicación con cada uno de sus alumnos.</p>
            </div>
            <div class="btn-container">
              <button onClick={() => handleClick(urls[5])} class="btn draw-border">Información</button>
            </div>
          </div>
        </div>

      </div>

      



      <div class="container-bar fade-in-animation">
        <input type="checkbox" id="btn-social" />
        <label for="btn-social" class="fa fa-play"></label>
        <div class="icon-social">
          <a href="https://unis.edu.gt/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Escudo-UNIS.png" alt="" class="social-logo" />
          </a>
          <a href="https://www.facebook.com/unisgt" target="_blank" rel="noopener noreferrer" class="fa fa-facebook"></a>
        </div>
      </div>
    </>
  )
}