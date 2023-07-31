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

export const Rafael = () => {
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
        "https://principal.url.edu.gt/category/facultades/facultad-de-ciencias-de-la-salud/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-ciencias-politicas-y-sociales/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-ingenieria/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-humanidades/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-teologia/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-ciencias-economicas-y-empresariales/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-ciencias-ambientales-y-agricolas/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-arquitectura-y-diseno/",
        "https://principal.url.edu.gt/category/facultades/facultad-de-ciencias-juridicas-y-sociales/"
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

                <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="" width={'300vw'} height={'300vh'} />

                <div className="TitulosUSAC">
                    <h1 class="cssFont_2" >UNIVERSIDAD Rafael Landivar</h1>
                    <p className="cssFont_3" >Promoviendo la eduación superior autónoma, pública y gratuita</p>
                    <p className="cssFont_4">Mensualidad: Ronda de Q2200 a Q2700 dependiendo la carrera incluyendo laboratorios</p>
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
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias de la Salud</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias de la Salud fue fundada el 1 de julio de 1998, por lo que es la facultad más joven de la Universidad Rafael Landívar. Se inició con la carrera de Enfermería a nivel de técnico universitario; para el 2000 se incorporó el técnico en Fisioterapia, y en el 2001 la carrera de Terapia de Audición, Voz y Lenguaje.

</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[0])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Políticas y Sociales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias Políticas y Sociales es una unidad académica cuya misión es impulsar el desarrollo de las ciencias sociales en Guatemala, formando profesionales comprometidos profundamente con la realidad nacional y el contexto internacional, que incidan positiva y participativamente en la transformación de una sociedad guatemalteca más justa y más humana.
</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ingeniería</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ingeniería de la Universidad Rafael Landívar es la unidad académica responsable de la formación, con excelencia académica y valores, de estudiantes interesados en ciencias aplicadas bajo diferentes áreas disciplinares de ingeniería.</p>
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
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Humanidades</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Humanidades es una unidad académica integrada por los departamentos de Ciencias de la Comunicación, Psicología, Letras y Filosofía, Educación e Idiomas. Ofrece una diversidad de programas académicos en los niveles de diplomado, profesorado, licenciatura y maestría; con presencia en Campus Central y en todos los demás campus y sedes.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[3])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Teología</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Teología de la Universidad Rafael Landívar (URL) se fundó en 1986, buscando ser promotora y formadora de religiosos y religiosas, inicialmente. Posteriormente, y acorde a los signos de los tiempos, se ha preocupado por la formación teológica de mujeres y hombres laicos, en su mayoría profesionales, que participan activamente en movimientos eclesiales y parroquiales.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[4])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Económicas y Empresariales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias Económicas y Empresariales inició sus actividades académicas en enero de 1962, como respuesta a la gran demanda de formación universitaria existente entre 1950 y 1960. Actualmente, la facultad ofrece una competitiva preparación académica, con una sólida formación en valores y liderazgo emprendedor, que propicia la creatividad, la innovación y el pensamiento crítico.</p>
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
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Ambientales y Agrícolas</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Nuestra misión es constituir una plataforma para la formación integral de profesionales en las ciencias ambientales y agrícolas, excelentes en cuanto a sus competencias técnico-científicas, con altos valores, orientados a contribuir al desarrollo del país, aprovechando racionalmente sus recursos naturales y liderando el cambio de modelo productivo hacia uno más sostenible, humano y justo.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[6])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Arquitectura y Diseño</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad tiene más de 45 años de haberse instituido. Durante este tiempo se ha convertido en un referente importante de la arquitectura y el diseño en la región. Se destaca la formación centrada en el diseño, el arte, la tecnología, la investigación, la historia, la identidad y los valores. </p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[7])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Facultad de Ciencias Jurídicas y Sociales</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">La Facultad de Ciencias Jurídicas y Sociales tiene como tarea fundamental la formación de profesionales de las ciencias jurídicas y sociales, y de la investigación criminal y forense, con excelencia académica, capaces de ejercer la profesión, aplicando de manera objetiva y efectiva los postulados deontológicos y derechos fundamentales, con un claro sentido de equidad, probidad y justicia social.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[8])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

            </div>

            <br />

            <div class="container3mil fade-in-animation">
            </div>
            <br />

            <div class="container-bar fade-in-animation">
                <input type="checkbox" id="btn-social" />
                <label for="btn-social" class="fa fa-play"></label>
                <div class="icon-social">
                    <a href="https://principal.url.edu.gt/" target="_blank" rel="noopener noreferrer">
                        <img src="https://seeklogo.com/images/U/universidad-rafael-landivar-logo-531484FDAB-seeklogo.com.png" alt="" class="social-logo"/>
                    </a>
                    <a href="https://www.facebook.com/url.landivar" target="_blank" rel="noopener noreferrer" class="fa fa-facebook">
                    </a>
                </div>
            </div>
        </>
    )
}