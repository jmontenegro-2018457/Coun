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

export const Vinci = () => {
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
        "https://udv.edu.gt/facultad/facultad-de-ciencias-criminologicas-criminalisticas-y-de-seguridad/",
        "https://udv.edu.gt/facultad/facultad-de-enfermeria-y-ciencias-del-cuidado-de-la-salud/",
        "https://udv.edu.gt/facultad/facultad-de-humanidades/",
        "https://udv.edu.gt/facultad/facultad-de-ciencias-odontologicas/",
        "https://udv.edu.gt/facultad/facultad-de-ciencias-juridicas-y-sociales/",
        "https://udv.edu.gt/facultad/facultad-de-ingenieria/",
        "https://udv.edu.gt/facultad/facultad-de-ciencias-medicas-y-de-la-vida/",
        "https://udv.edu.gt/facultad/facultad-de-musica-y-artes-visuales/",
        "https://udv.edu.gt/facultad/facultad-de-ciencias-administrativas-y-comerciales/",
        "https://udv.edu.gt/facultad/facultad-de-ciencias-agronomicas/",
        "https://udv.edu.gt/facultad/facultad-de-arquitectura-y-diseno/"
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

                <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="" width={'300vw'} height={'300vh'} />

                <div className="TitulosUSAC">
                    <h1 class="cssFont_2" >UNIVERSIDAD DA VINCI DE GUATEMALA</h1>
                    <p className="cssFont_3" >Promoviendo la eduación superior autónoma, pública y gratuita</p>
                    <p className="cssFont_4">Mensualidad: Ronda de Q175 de inscripcion mensualidades y matricula son de acuerdo a la carrera</p>
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
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Criminológicas, Criminalísticas y de Seguridad</p>
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
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Enfermería y Ciencias del Cuidado de la Salud</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Universidad Da Vinci de Guatemala ha diseñado la carrera de Técnico Universitario en Enfermería dirigida a egresados de educación media que deseen formarse y adquirir conocimientos para desempeñarse profesionalmente en el campo de la enfermería.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Humanidades</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Las Ciencias Sociales y Humanidades se encargan del estudio del ser humano como ente social, dando gran énfasis a aspectos como el comportamiento, interacciones humanas y la cultura.</p>
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
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Odontológicas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">El título de Cirujano Dentista de la Facultad de Ciencias Odontológicas conlleva un programa académico, en el cual se forman profesionales capaces de abordar con criterio y habilidad técnica la prevención, el diagnóstico, el pronóstico, así como el tratamiento y rehabilitación de enfermedades y situaciones clínicas estomatológicas, con alta calidad, precisión y estética.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[4])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

            </div>

            <br />

            <div class="container3mil fade-in-animation">

                <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Jurídicas, Sociales y Relaciones Internacionales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Licenciatura en Ciencias Jurídicas y Sociales tiene como objetivo general formar juristas con excelencia académica, capaces de ejercer la abogacía y el notariado aplicando de manera objetiva y efectiva los postulados deontológicos y derechos fundamentales.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[6])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Inginiería</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">El egresado de la Carrera de Ingeniería de Sistemas de la Universidad Da Vinci de Guatemala, es un profesional capaz de analizar, diseñar, desarrollar sistemas y gestionar proyectos, que involucran personas, procesos e información, para automatizaciones mediante diseño, programación, mantenimiento e innovación de sistemas de información y de redes, aplicando las tecnologías de la información.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[7])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Médicas y de la Vida</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias Médicas y de la vida se propone formar Recurso Humanos en Deportes, a través de un programa modular de dos y cuatro años, en tres áreas: Área de Formación Básica, Área de Formación Específica y Área de Formación Profesional. Integradas por las líneas curriculares de Investigación, Metabolismo Biomecánica Nutrición Salud y Principios y Valores.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[8])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

            </div>

            <br />

            <div class="container3mil fade-in-animation">

            <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Música y Artes Visuales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">El grado académico de TÉCNICO UNIVERSITARIO consta de dos años de estudios (4 semestres) que abarcan el desarrollo de habilidades y adquisición de conocimiento a nivel técnico  en  áreas  de la producción de música y sonido digital.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[9])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Administrativas y Comerciales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La globalización de los mercados sustentados en la apertura comercial representa actualmente grandes oportunidades de negocios para las personas físicas y jurídicas.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[9])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Agronómicas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias Agronómicas ofrece la carrera de Ingeniería Agronómica, enfocada en profesionales con alto nivel académico en producción agrícola. Formamos graduados competitivos con habilidades empresariales y administrativas para satisfacer las demandas del sector productivo y académico.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[9])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Arquitectura y Diseño</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad ofrece distintos diplomados como: Curaduría y Museografía, en Interiorismo, en Organización de Eventos y Mercadeo Visual. Estos diplomados permiten a las personas interesadas en el tema profundizar sus conocimientos y contar con el respaldo académico de Universidad Da Vinci.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[9])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>


            </div>
            

            <br />

            <div class="container-bar fade-in-animation">
                <input type="checkbox" id="btn-social" />
                <label for="btn-social" class="fa fa-play"></label>
                <div class="icon-social">
                    <a href="https://udv.edu.gt/" target="_blank" rel="noopener noreferrer">
                        <img src="https://udv.edu.gt/wp-content/uploads/2018/07/favicon.png" height="50px" width="50px" />
                    </a>
                    <a href="https://www.facebook.com/UDVGT1/?locale=es_LA" target="_blank" rel="noopener noreferrer" class="fa fa-facebook">
                    </a>
                </div>
            </div>
        </>
    )
}