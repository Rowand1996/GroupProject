import React from "react";
import NavBar from "./NavBar.jsx";
import { useParams } from "react-router-dom";



export default function statePage() {
    let { id } = useParams();
    console.log(id);


  return (
    <>
      <NavBar />
      <div className="container">
        <h1>State Page</h1>
        <div className="container col-md-6">
         
        </div>
      </div>
    </>
  );
}