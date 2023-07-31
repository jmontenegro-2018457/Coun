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

export const Occi = () => {
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
        "https://www.udeo.edu.gt/arqui/",
        "https://www.udeo.edu.gt/pem_admon_edu/",
        "https://www.udeo.edu.gt/pem_ciencias_edu/",
        "https://www.udeo.edu.gt/electronica/",
        "https://www.udeo.edu.gt/juridicas/",
        "https://www.udeo.edu.gt/admon/",
        "https://www.udeo.edu.gt/tecenferemeria/",
        "https://www.udeo.edu.gt/enfermeria/"

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

                <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="" width={'300vw'} height={'300vh'} />

                <div className="TitulosUSAC">
                    <h1 class="cssFont_2" >UNIVERSIDAD OCCIDENTAL DE GUATEMALA</h1>
                    <p className="cssFont_3" >Promoviendo la eduación superior autónoma, pública y gratuita</p>
                    <p className="cssFont_4">Mensualidad: Ronda de Q700 a Q1300 dependiendo la carrera</p>
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
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">ARQUITECTURA</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">El objetivo de esta carrera es formar arquitectos profesionales capaces de analizar, planificar, diseñar, dirigir y supervisar obras de construcción, tanto públicas como privadas, brindándoles las herramientas y el conocimiento suficiente para desempeñar la labor con excelencia.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[0])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">HUMANIDADES</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Los aspirantes a las carreras orientadas a la educación, son personas que se caracterizan por tener un alto compromiso con el trabajo social y pedagógico. Esta, como todas las carreras educativas, te llevará a exigirte y a demostrar tus capacidades de la mejor manera en la gestión y el control de la enseñanza.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[1])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">FACULTAD DE CIENCIAS JURÍDICAS Y SOCIALES</p>
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
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">INGENIERÍA</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">El objetivo de esta carrera es preparar a profesionales competitivos, capaces de aplicar nuevas tecnologías computacionales, desarrollar softwares para solucionar problemas informáticos y disminuir la vulnerabilidad de sistemas, con métodos, modelos y estándares de calidad.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[3])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">DERECHO</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Esta es una carrera de mucha transcendencia. La abogacía es una profesión que debe mantenerse al día de los diversos cambios legislativos que afectan a sus áreas de trabajo para desempeñar su labor con diligencia y efectividad.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[4])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">CIENCIAS ECONÓMICAS</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Esta es una carrera de mucha transcendencia. La abogacía es una profesión que debe mantenerse al día de los diversos cambios legislativos que afectan a sus áreas de trabajo para desempeñar su labor con diligencia y efectividad.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[5])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

              </div>
              <div class="container3mil fade-in-animation">

                <div class="Facultades">
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">CIENCIAS DE LA SALUD</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">Los aspirantes a esta carrera, se caracterizan por ser personas respetuosas, comunicativas, empáticas y con un gran sentido humano, capaces de sobrellevar situaciones estresantes por el bien del prójimo.</p>
                        </div>
                        <div class="btn-container">
                            <button onClick={() => handleClick(urls[6])} class="btn draw-border">Información</button>
                        </div>
                    </div>
                </div>

                <div class="Facultades">
                    <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" alt="Person" class="FacultadIMG" />
                    <br />
                    <center>
                        <p class="containerTitle">Licenciatura de la Salud</p>
                    </center>
                    <div class="card_content3mil">
                        <div class="containerText">
                            <p class="containerParr">El modelo educativo de la facultad de Odontología se entremezcla en un modelo tradicional de enseñanza y uno creciente por competencias. En este último se busca que la enseñanza se centralice en el estudiante, pretendiendo como fin último un aprendizaje significativo, mediante la individualización y la estimulación de la creatividad en la construcción de su propio conocimiento.</p>
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
                    <a href="https://www.udeo.edu.gt/" target="_blank" rel="noopener noreferrer">
                        <img src="https://losabogadosenguatemala.com/wp-content/uploads/2022/01/LOGO-UNIVERSIDAD-DE-OCCIDENTE-2022.png" height="50 px" width="50px" />
                    </a>
                    <a href="https://www.facebook.com/UdeOMontesquieu/?locale=es_LA" target="_blank" rel="noopener noreferrer" class="fa fa-facebook">
                    </a>
                </div>
            </div>
        </>
    )
}