import React from "react"
import imagen from '../assets/logo.png'
import '../css/cards.css'
import { Link } from "react-router-dom"

export const Universidades = () => {
  return (
    <>

      <div className="body4mil fade-in-animation">
        <center> <h1 style={{ color: "#363753", paddingTop:'30px', paddingBottom: '10px'}} >Universidades</h1></center>
      </div>

      <div className="centrado fade-in-animation">

        <div className="cards-container fade-in-animation">

          <div className="container">
            <div className="card card0">
              <Link to='/Istmo/Universidad_del_Itsmo'>
                <div className="border">
                 
                </div>
                <h2 className="tuniversidades">Universidad del ISTMO</h2>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card1">
              <Link to='/SanCarlos/Universidad_de_San_Carlos'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad de San Carlos de Guatemala</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card2">
              <Link to='/UVG/Universidad_del_Valle_de_Guatemala'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad del Valle de Guatemala</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card3">
              <Link to='/Galileo/Universidad_Galileo'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad Galileo</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card4">
              <Link to='/UMG/Universidad_Mariano_Galvez'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad Mariano Galvez</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card5">
            <Link to='/Marroquin/Universidad_Francisco_Marroquin'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad Francisco Marroquín</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card6">
              <Link to='/Rafael/Universidad_Rafael_Landivar'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad Rafael Landivar</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card7">
              <Link to='/Meso/Universidad_MesoAmericana'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad MesoAmericana</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card8">
              <Link to='/Pana/Universidad_Panamericana'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad Panamericana</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card9">
              <Link to='/Vinci/Universidad_Da_Vinci'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad Da Vinci de Guatemala</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card10">
              <Link to='/Pablo/Universidad_de_San_Pablo'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad de San Pablo de Guatemala</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="card card11">
              <Link to='/Occi/Universidad_de_Occidente_de_Guatemala'>
                <div className="border">
                  <h2 className="tuniversidades">Universidad de Occidente de Guatemala</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
