import React from "react"
import { Link } from "react-router-dom"
import Comment  from "../components/comment"
import { AuthContext } from '../index';
import { useEffect } from "react"
import { useState, useContext } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import '../CSS/comentarios.css'

export const Comentarios = () => {
	const { dataUser } = useContext(AuthContext);
	const { id } = useParams();
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token')
	  };

	const [university, setUniversity] = useState({})
	const [comments, setComments] = useState([]);

	const [form, setForm] = useState({
		user: dataUser.sub,
		university: id,
		comment: '',
		
	});

	const handleChange = (e) => {
		setForm({
		  ...form,
		  [e.target.name]: e.target.value
		});
	};

	const addComment = async(e) =>{
		try {
			const { data } = await axios.post(`https://coun-back-saurio.vercel.app/comments/save`, form, { headers: headers });
			console.log(form)
		} catch (err) {
			console.log(err)
		}
	}

	const getComments = async () => {
        try {
          const { data } = await axios(`https://coun-back-saurio.vercel.app/comments/get/${id}`, { headers: headers })
          setComments(data)
          
        } catch (err) {
          console.log(err)
        }
      }

	  const getUniversity = async () => {
		try {
		  const { data } = await axios(`https://coun-back-saurio.vercel.app/university/get/${id}`, { headers: headers });
		  setUniversity(data.university);
		  console.log(data);
		} catch (err) {
		  console.log(err);
		}
	  };
	  
	  useEffect(() => {
		getUniversity();
	  }, [dataUser]);
	  
	  useEffect(() => {
		console.log(university); // Realizar acciones con university después de que se actualiza
	  }, [university]);

	  useEffect(() => {
       
        getComments();
    }, [dataUser])

    return (
        <>
        <br /><br />
		{
			dataUser.role?(<>
			
			<div className="containerC">

			<h1 className="mb-4">Comentarios sobre {university && university.name ? university.name.replace(/_/g, ' ') : ''}</h1>

            <br /><br />
            <h4>Puedes comentar y ver comentarios de otros usuarios</h4>
        </div>
        <br /><br />
       
	   

        <div class="containerC" >
            
            <form action="#">
             <ul>         
			<div class="comment-container">
				<textarea class="comment-textarea"  onChange={handleChange} name='comment' id="comment" placeholder="Escribe tu comentario aquí..."></textarea>
				<button class="btn0" onClick={(e) => {  addComment(e) }}> Comentar</button>
			</div>
			
		</ul>
		</form>  
  
		</div>

			</>):<><div className="containerC"><h4>Accede a una cuenta para poder comentar</h4></div></>
		}

        

<br /><br />
<div class="comments-container">
		<h1>Comentarios </h1>

		<ul id="comments-list" class="comments-list">
			
				
				
				
		{Array.isArray(comments) && comments.length > 0 ? (
		comments.map(({ _id, user, date, comment, likesCount }, i) => (
			<Comment
			key={i}
			id={_id}
			user={user?.username}
			date={date}
			comment={comment}
			likesN={likesCount}
			universityName={university && university.name ? university.name.replace(/_/g, ' ') : ''}
			/>
		))
		) : (
		<h3>No hay comentarios</h3>
		)}



					
			

			
		</ul>
	</div>



        </>
    )
}