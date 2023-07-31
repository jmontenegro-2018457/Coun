
import { AuthContext } from '../index';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({id, user, date, comment, likesN }) => {
    const [hasUserLiked, setHasUserLiked] = useState(false); // Estado para almacenar si el usuario ha dado like
    const [likesC, setLikesC] = useState(likesN)
    const [likes, setLikes] = useState([]);
    const { dataUser } = useContext(AuthContext);
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      };

   

      useEffect(() => {
        getLikes();
    }, [dataUser]);
    
    const getLikes = async () => {
        try {
            const { data } = await axios(`https://coun-back-saurio.vercel.app/comments/getLikes/${id}`, { headers: headers });
            setLikes(data.likes);
            setHasUserLiked(data.likes.some(like => like.user === dataUser.sub));
        } catch (err) {
            console.log(err);
        }
    };
    
    const addLike = async () => {
      try {
        const { data } = await axios.put(`https://coun-back-saurio.vercel.app/comments/addLike/${id}/${dataUser.sub}`, { headers: headers });
        setLikes(data.likes);
        setHasUserLiked(true);
        
      } catch (err) {
        console.log(err);
      }
    };
    
    const deleteLike = async () => {
      try {
        const { data } = await axios.delete(`https://coun-back-saurio.vercel.app/comments/deleteLike/${id}/${dataUser.sub}`, { headers: headers });
        setLikes(data.likes);
        setHasUserLiked(false);
      } catch (err) {
        console.log(err);
      }
    };
    
  

      const handleLikeChange = async (e) => {
        const checked = e.target.checked;
    
        if (checked) {
          // Si el usuario ha marcado el checkbox, llamar a la función addLike
          setLikesC((prevLikes) => prevLikes + 1);
          await addLike();
        } else {
          // Si el usuario ha desmarcado el checkbox, llamar a la función deleteLike
          setLikesC((prevLikes) => prevLikes - 1);
          await deleteLike();
        }
    
        // Actualizar el estado hasUserLiked
        setHasUserLiked(checked);

        useEffect(() => {
          getLikes();
        }, []);
      };
    
      
   

  return (
    <li>
    <div class="comment-main-level">
    <div className="comment-box ">
      <div className="comment-head ">
        <h6 className="comment-name by-author">{user}</h6>
        <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
        <div className="likes-container">
          <label className="heart-checkbox">
            <input type="checkbox" checked={hasUserLiked} onChange={handleLikeChange} />
            <i className="fa fa-heart"></i>
          </label>
          <span>{likesC}</span>
        </div>
      </div>
      <div className="comment-content">
        {comment}
      </div>
    </div>
    </div>
    </li>
  );
};

export default Comment;
