import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../index';
import '../CSS/ranking.css'


export const Ranking = () => {
  const [universities, setUniversities] = useState([]);
  const { dataUser } = useContext(AuthContext);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  };

  const getUniversity = async () => {
    try {
      const { data } = await axios(`https://coun-back-saurio.vercel.app/university/get`, { headers: headers });
      await setUniversities(data);
      console.log(data)
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUniversity();
  }, [dataUser]);

  return (
    <div className="ContainerC">
    <div className="ranking-container">
        <br /><br />
        <center> <h1 className="ranking-title">Universidades Mejor Calificadas</h1></center>
        <br /><br />
      <ul className="ranking-list">
        {universities.map((university, index) => (
          <li key={index} className="ranking-item">
            <h3 className="card-title">Universidad #{index + 1}</h3>
            <div className="university-name"> <h4> {university.name.replace(/_/g, ' ')}</h4></div>
            <div className="average-rating">Promedio de calificaciones: {university.averageRating} de 10 </div>
            <div className="average-rating">Número de votos: {university.totalVotes}</div>
           
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};
