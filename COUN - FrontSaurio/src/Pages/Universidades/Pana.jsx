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

export const Pana = () => {
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
        "https://ingenieria.upana.edu.gt/",
        "https://comunicacion.upana.edu.gt/",
        "https://economicas.upana.edu.gt/",
        "https://juridicas.upana.edu.gt/",
        "https://humanidades.upana.edu.gt/",
        "https://educacion.upana.edu.gt/",
        "https://teologia.upana.edu.gt/",
        "https://medicas.upana.edu.gt/"
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

                <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="" width={'300vw'} height={'300vh'} />

                <div className="TitulosUSAC">
                    <h1 class="cssFont_2" >UNIVERSIDAD PANAMERICANA</h1>
                    <p className="cssFont_3" >Promoviendo la eduación superior autónoma, pública y gratuita</p>
                    <p className="cssFont_4">Mensualidad: Ronda de los Q2500 pero varia si es carrera corta o larga</p>
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
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">FACULTAD DE INGENIERÍA Y CIENCIAS APLICADAS</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Nuestros estudiantes son los impulsores de la ciencia, tecnología e innovación del presente y el futuro. Nuestras carreras se enfocan en el usuario para favorecer el diseño de productos y servicios únicos que generen desarrollo y crecimiento para el país y el mundo. </p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[0])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <center>
                        <p class="containerTitle">FACULTAD DE CIENCIAS DE LA COMUNICACIÓN</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <br />
                            <p class="containerParr">Vamos a desarrollar tu talento, porque contamos con los mejores catedráticos que son profesionales activos y reconocidos en sus campos de trabajo; contamos con el edificio Multimedia más completo y moderno de Guatemala, equipado con laboratorio de postproducción, laboratorio de diseño, islas de edición, estudio profesional  de TV con capacidad para tres sets, un laboratorio profesional de audio con radio en línea universitaria. </p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Económicas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias Económicas ofrece programas con un enfoque global, práctico, innovador y basados en una enseñanza con principios y valores, con una amplia cartera de opciones para los interesados en ser profesionales o especialistas en las áreas económicas y empresariales del sector público o privado.</p>
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
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Jurídicas y De la Justicia</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Comprometida con la formación de Abogados y Notarios  capaces, honestos e íntegros;  La Facultad de Ciencias Jurídicas y Justicia se fundamenta en el estudio del derecho basado en el ejercicio del pensamiento crítico, reflexivo, lógico, analítico, divergente, hipotético, transitivo, silogístico y de argumentación.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[3])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Humanidades</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">En la facultad de humanidades promovemos el bienestar humano y la salud mental en los contextos educativos, laborales, comunitarios, deportivos y personales; creando oportunidades de desarrollo humano sostenible.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[4])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Educación</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias de la Educación se ha comprometido en la formación de profesionales, con ética y valores, con amplio conocimiento de las teorías educativas y la investigación como herramienta para obtener información y generar conocimiento.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[5])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

            </div>

            <br />

            <div class="container3mil fade-in-animation">

                <div class="Facultades">
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Teología</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">El estudio de la teología a nivel universitario cuenta con un programa con énfasis en la práctica y la tarea pastoral, su estructura curricular permite la inserción al mismo, de profesionales de distintas áreas del saber humano, especialmente aquellos que, de alguna manera, tienen relación con las instituciones eclesiásticas, para eclesiásticas y organizaciones afines.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[6])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Médicas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Formando a las futuras generaciones de médicos y especialistas que transformarán la salud en el país, llevándolos a la adquisición de conocimientos de alto nivel por medio de la alta calidad académica, integrando el uso de la tecnología en el área de salud, fundamentados en principios y valores que respeten la vida, dignidad y ética de las personas, para formar médicos íntegros al servicio de la población.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[7])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>


            </div>

            <br />

            <div class="container-bar fade-in-animation">
                <input type="checkbox" id="btn-social" />
                <label for="btn-social" class="fa fa-play"></label>
                <div class="icon-social">
                    <a href="https://www.upana.edu.gt/" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.universidadesonline.com.gt/logos/original/logo-universidad-panamericana-de-guatemala.webp" alt="" class="social-logo"/>
                    </a>
                    <a href="https://www.facebook.com/upanaguatemala" target="_blank" rel="noopener noreferrer" class="fa fa-facebook">
                    </a>
                </div>
            </div>
        </>
    )
}