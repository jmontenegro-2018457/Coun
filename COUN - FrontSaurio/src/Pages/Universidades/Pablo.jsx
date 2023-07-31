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

export const Pablo = () => {
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
        "https://uspg.edu.gt/usp/administracion-de-empresas-con-especializacion-retail/",
        "https://uspg.edu.gt/usp/ciencias-juridicas-y-sociales/",
        "https://uspg.edu.gt/usp/liderazgo-organizacional/",
        "https://uspg.edu.gt/usp/psicologia-industrial-y-comportamiento-organizacional/",
        "https://uspg.edu.gt/usp/liderazgo-organizacional-d/",
        "https://uspg.edu.gt/usp/ingenieria-en-sistemas/",
        "https://uspg.edu.gt/usp/ciencias-juridicas-y-sociales/",
        "https://uspg.edu.gt/usp/teologia-practica/",
        "https://uspg.edu.gt/usp/diseno-grafico-y-fotografia/",
        "https://uspg.edu.gt/usp/teologia-biblica-y-ministerio/"
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

                <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="" width={'300vw'} height={'300vh'} />

                <div className="TitulosUSAC">
                    <h1 class="cssFont_2" >UNIVERSIDAD SAN PABLO DE GUATEMALA</h1>
                    <p className="cssFont_3" >Promoviendo la eduación superior autónoma, pública y gratuita</p>
                    <p className="cssFont_4">Mensualidad: En promedio son Q3200 pero varia segun la carrera</p>
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
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Empresariales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:

                                Administración y Administración Pública
                                Arquitectura Moda y Diseño
                                Ciencias Agrarias
                                Gestión Medio Ambiente
                                Ingeniería y Tecnología
                                Psicología y Ciencias del Comportamiento
                                Publicidad, Marketing y RRPP
                                Es  imperativa la formación de profesionales con perfiles innovadores que los capacite para aumentar la competitividad de los sistemas de producción agropecuaria del país. En este contexto, se propone la carrera de Ingeniero Agrónomo, en el grado académico de licenciatura, con un perfil gerencial y con dos áreas de especialización.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[0])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Humanidades</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:

                                Ciencias Sociales y Humanidades
                                Educación
                                Formación Profesional</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Liderazgo</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:Recursos Humanos y Riesgo Laboral</p>
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
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Ciencias de la Psicologia</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de: Psocologia</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[3])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Liderazgo y Empresarialidad</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[4])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ingeniería y Ciencia Aplicada</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:</p>
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
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Jurídicas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:

                                Derecho y Leyes</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[6])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Educación</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[7])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Diseño Grafico</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de: Diseño Grafico</p>
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
                    <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Teología</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una facultad/escuela de la Universidad San Pablo de Guatemala en la que se dictan programas de:</p>
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
                    <a href="https://uspg.edu.gt/usp/" target="_blank" rel="noopener noreferrer">
                        <img src="https://moria.aurens.com/organizations/0e7e0f22-4b17-4a0f-849c-60d45e9e6cd3/logos/6f4fe6-115.png" height="50 px" width="50 px" />
                    </a>
                    <a href="https://www.facebook.com/USanPablo/?locale=es_LA" target="_blank" rel="noopener noreferrer" class="fa fa-facebook">
                    </a>
                </div>
            </div>
        </>
    )
}