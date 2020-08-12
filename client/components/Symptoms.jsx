import React, { useState } from "react";
import NavBar from "./NavBar.jsx";
import { Link } from "react-router-dom";
import DoctorImg from '../../public/assets/doctor1.png';
import DoctorImg2 from '../../public/assets/doctor2.png';

export default function Symptoms() {



  return (
    <>
      <NavBar />
      <div>
        <div className="container" id="wholePageForSymptoms">
          <h1 className="symptomsHeader">Symptoms of Coronavirus</h1>
          <hr className="lineUnderTitle"></hr>
            <p id="firstSymptomsWord">Watch for symptoms People with COVID-19 have had a wide range of symptoms reported – ranging from mild symptoms to severe illness. &nbsp; Symptoms may appear <span className="bold">2-14 days after exposure to the virus.</span> People with these symptoms may have COVID-19:</p>
          <ul className="text-left allSymptoms">
            <li>Fever or Chills</li>
            <li>Shortness of Breathe or Difficultly Breathing</li>
            <li>Fatigue</li>
            <li>Muscle or Body Aches</li>
            <li>Headache</li>
            <li>New Loss of Taste or Smell</li>
            <li>Sore Throat</li>
            <li>Congestion or Runny Nose</li>
            <li>Nausea or Vomiting</li>
            <li>Diarrhea</li>
          </ul>
          <div className="d-flex justify-content-left">
            <div className="seeADoctor">
              <img id="doctorLogo" src={DoctorImg2} alt="Doctor img" width="100" height="100" />
              
                <Link to="/map">
                  <button type="button" id="getTested" className="btn btn-sm">
                    Location To Get Tested
                  </button>
                </Link>
                <p id="getTestedTxt"><h4>Get Tested</h4> Avaliable Testing Sites near you.</p>
            </div>
          </div>

          <div className="text-left emergencyCare">
            <div className="margin">
              <p id="emergencyCareTitle">When to seek emergency medical attention</p>
              <p id="emergencyCareUnderTitle">
                Look for <span className="bold">emergency warning signs*</span>for COVID-19. If someone is showing any of these signs, <span className="bold">seek emergency medical care immediately:</span>
              </p>
              <ul>
                <li>Trouble Breathing</li>
                <li>Persistent Pain or Pressure in the Chest</li>
                <li>New confusion</li>
                <li>Inability to Wake or Stay Awake</li>
                <li>Bluish Lips or Face</li>
              </ul>
              <p id="emergencyCareUnderFooter">
                <span className="bold">Call 911 or call ahead to your local emergency facility:</span> Notify the operator that you are seeking care for someone who has or may have COVID-19.
              </p>
            </div>
          </div>

          <div className="video d-flex justify-content-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/x2Jfcg6OF0g"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
