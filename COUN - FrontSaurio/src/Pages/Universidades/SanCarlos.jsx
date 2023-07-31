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

export const SanCarlos = () => {
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
        "https://farusac.edu.gt/",
        "http://fausac.gt/",
        "http://economicas.usac.edu.gt/",
        "https://derecho.cloud/",
        "https://medicina.usac.edu.gt/",
        "https://portal.ccqqfar.usac.edu.gt./",
        "http://humanidades.usac.edu.gt/portal/",
        "https://portal.ingenieria.usac.edu.gt/",
        "https://odontologia.usac.edu.gt/",
        "http://portal.fmvz.usac.edu.gt/"
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

                <img src="https://www.usac.edu.gt/g/escudo10.png" alt="" width={'300vw'} height={'300vh'} />

                <div className="TitulosUSAC">
                    <h1 class="cssFont_2" >UNIVERSIDAD SAN CARLOS DE GUATEMALA</h1>
                    <p className="cssFont_3" >Promoviendo la eduación superior autónoma, pública y gratuita</p>
                    <p className="cssFont_4">Mensualidad: Ronda de los Q350 a Q500 dependiendo cuantos cursos se lleven</p>
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
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Arquitectura</p>
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
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Agronomía</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Se ha caracterizado por ser una Unidad Académica que va a la vanguardia educativa en el ámbito de nuestra tricentenaria Universidad de San Carlos de Guatemala.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Económicas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Prepara profesionales con alto nivel académico, formación integral, científica, técnica y social humanística, en las áreas de conocimiento de: Economía, Contaduría Pública y Auditoría, Administración de Empresas.</p>
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
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Jurídicas y Sociales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Ofrece programas de estudio en el campo del derecho, como la Licenciatura en Ciencias Jurídicas y Sociales, Abogado y Notario. También realiza actividades de investigación, extensión y servicio social.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[3])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Médicas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Fue fundada en 1681 y es el centro de enseñanza superior de Medicina más grande e importante de Guatemala.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[4])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Químicas y Farmacia</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una unidad académica de la Universidad de San Carlos de Guatemala que ofrece carreras relacionadas con la química y la farmacia.</p>
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
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Humanidades</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Tiene como objetivo formar humanistas con capacidades analíticas y críticas que les permitan incursionar en los distintos campos del saber, siendo capaces de conocer, analizar e interpretar la realidad histórica, ya sea nacional o mundial, pero siempre con la intención de encontrar soluciones a una problemática determinada.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[6])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Inginiería</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Es una de las 10 facultades que conforman la Universidad de San Carlos de Guatemala. Fundada en 1880, es la facultad de ingeniería más grande e importante de Guatemala. Atiende a una población estudiantil de más de doce mil estudiantes de pregrado siendo por ende una de las unidades académicas más pobladas de la Universidad.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[7])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Odontología</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Odontología de la USAC es una de las unidades académicas más reconocidas y prestigiosas de Guatemala en el campo de la odontología. Esta facultad forma parte de la Universidad de San Carlos de Guatemala, la cual es una de las instituciones de educación superior más antiguas y destacadas de América Latina.</p>
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
                    <img src="https://www.usac.edu.gt/g/escudo10.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Médicina Veterinaria y Zootecnia</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Medicina Veterinaria y Zootecnia es una de las diez facultades que conforman la Universidad de San Carlos de Guatemala, la única universidad estatal de Guatemala. Fue fundada en el año 1957 y se dedica a formar profesionales integrales y competentes en la Medicina Veterinaria y Zootecnia.</p>
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
                    <a href="https://www.usac.edu.gt/index.php" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.usac.edu.gt/img/logo_usac2018.svg" alt="" />
                    </a>
                    <a href="https://www.facebook.com/UsacOficial" target="_blank" rel="noopener noreferrer" class="fa fa-facebook">
                    </a>
                </div>
            </div>
        </>
    )
}