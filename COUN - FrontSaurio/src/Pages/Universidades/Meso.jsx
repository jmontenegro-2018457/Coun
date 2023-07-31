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

export const Meso = () => {
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

    // Llamada a la función con un array de URLs
    const urls = [
        "https://www.umes.edu.gt/facultades/ciencias-de-la-comunicacion-social/",
        "https://www.umes.edu.gt/facultades/ciencias-juridicas-y-sociales/",
        "https://www.umes.edu.gt/facultades/ciencias-humanas-y-sociales/"
    ];

    // Función para abrir en nueva pestaña al hacer clic en un botón
    const handleClick = (url) => {
        abrirEnNuevaPestana([url]);
    };

    const handleStarClick = (index, isHalf) => {
        setRating(index + (isHalf ? 0.5 : 1));
    };

    return (
        <>
            <div className="containerRegresar">
                <Link to="/Universidades"><button className="btnRegresar"><i class="fa-solid fa-arrow-left"></i></button></Link>
            </div>

            <div className="UsacContainer fade-in-animation">

                <img src="https://www.mesoamericana.edu.gt/wp-content/uploads/2012/01/Logo-Meso-Color.png" alt="" width={'300vw'} height={'300vh'} />

                <div className="TitulosUSAC">
                    <h1 class="cssFont_2" >UNIVERSIDAD MESOAMERICANA</h1>
                    <p className="cssFont_3" >Promoviendo la eduación superior autónoma, pública y gratuita</p>
                    <p className="cssFont_4">Mensualidad: Ronda de Q3000 de inicio pero depende la carrera</p>
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

            <br />

            <div class="container3mil fade-in-animation">

                <div class="Facultades">
                    <img src="https://www.mesoamericana.edu.gt/wp-content/uploads/2012/01/Logo-Meso-Color.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">CIENCIAS DE LA COMUNICACIÓN SOCIAL</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Caracterizada por ser una Facultad que desarrolla actividades de enseñanza aprendizaje, investigación y extensión, orientadas a la búsqueda de solución de problemas en las áreas de su especialidad.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[0])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.mesoamericana.edu.gt/wp-content/uploads/2012/01/Logo-Meso-Color.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">FACULTAD DE CIENCIAS JURÍDICAS Y SOCIALES</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Prepara profesionales con alto nivel académico, formación integral, científica, técnica y social humanística, en las áreas de conocimiento de: Economía, Contaduría Pública y Auditoría, Administración de Empresas.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

            </div>

            <br />

            <div class="container3mil fade-in-animation">

                <div class="Facultades">
                    <img src="https://www.mesoamericana.edu.gt/wp-content/uploads/2012/01/Logo-Meso-Color.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">FACULTAD DE CIENCIAS HUMANAS Y SOCIALES</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una unidad académica que busca contribuir a la educación integral de los estudiantes en las áreas afines a las humanidades, con el fin de formar ciudadanos capaces de interactuar positivamente con la sociedad bajo principios éticos y democráticos.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[2])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

              </div>

            <br />

            <div class="container-bar fade-in-animation">
                <input type="checkbox" id="btn-social" />
                <label for="btn-social" class="fa fa-play"></label>
                <div class="icon-social">
                    <a href="https://www.umes.edu.gt/" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.mesoamericana.edu.gt/wp-content/uploads/2012/01/Logo-Meso-Color.png" height="50px" width="50px" />
                    </a>
                    <a href="https://www.facebook.com/mesoamericana/?locale=es_LA" target="_blank" rel="noopener noreferrer" class="fa fa-facebook">
                    </a>
                </div>
            </div>
        </>
    )
}