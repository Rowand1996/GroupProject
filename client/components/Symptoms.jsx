import React, { useState } from "react";
import NavBar from "./NavBar.jsx";
import { Link } from "react-router-dom";


export default function Symptoms() {

  

  return (
    <>
      <NavBar />
      <div>
        <div className="container">
          <h1 className="symptomsHeader">Symptoms</h1>
          <ul className="text-center">
            <h3>Fever or Chills</h3>
            <h3>Shortness of Breathe or Difficultly Breathing</h3>
            <h3>Fatigue</h3>
            <h3>Muscle or Body Aches</h3>
            <h3>Headache</h3>
            <h3>New Loss of Taste or Smell</h3>
            <h3>Sore Throat</h3>
            <h3>Congestion or Runny Nose</h3>
            <h3>Nausea or Vomiting</h3>
            <h3>Diarrhea</h3>
          </ul>
          <div className="text-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/x2Jfcg6OF0g"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <h1>
              If you or anyone you know is showing any of these sign seek
              emergency medical care immediately :
            </h1>
            <ul>
              <h3>Trouble Breathing</h3>
              <h3>Persistent Pain or Pressure in the Chest</h3>
              <h3>New confusion</h3>
              <h3>Inability to Wake or Stay Awake</h3>
              <h3>Bluish Lips or Face</h3>
            </ul>

            <Link to="/map">
              <button type="button" className="btn btn-lg btn-danger mr-4">
                Locaion To Get Tested
              </button>
            </Link>

            <button type="button" className="btn btn-lg btn-danger">
              Nearest Hospital
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
