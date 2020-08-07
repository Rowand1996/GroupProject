import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { json, User, SetAccessToken, isLoggedIn} from '../utils/api';
import Logo from '../../public/assets/RadarLogo.png';
import Logo2 from '../../public/assets/RadarLogo2.png';
import Logo3 from '../../public/assets/RadarLogo3.png';

// let submitButton = $("#submitLogin");
// submitButton.click(function(){
//   alert( "Handler for .click() called." );
// });




const NavBar = ()  => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn)
  });

  let history = useHistory();
  let logOutBtn = $("#logoutBtn");
  let loginBtn = $("#dropDownMenu");
  if(isAuthenticated) {
    loginBtn.hide();
    logOutBtn.show();
  } else {
    loginBtn.show();
    logOutBtn.hide();
  }
  let submitButton = async() => {
    let password = $("#passwordDropDown").val();
    let email = $("#emailDropDown").val();
    let params = {
      email: email,
      password: password
    }
    console.log(params);
    let response = await fetch('http://localhost:3000/auth/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    
      if(response.status == 200) {
        
        let data = await response.json();
        console.log(data);
        SetAccessToken(data.token, { userid: data.userid, role: data.role })
        setIsAuthenticated(true);
        console.log("good job you logged in");
      } else {
        alert("stop tryna steal someones account you hacker");
      }

      console.log(User);
      console.log(isLoggedIn());

  }

  const logOut = () => {
    SetAccessToken(null,{userid: undefined, role: 'guest'});
    console.log("click event happened!");
    setIsAuthenticated(false);
  }
    

  

  

  return (

    

    <nav className="navbar nav-fill sticky-top navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="/">
        <img id="Logo"
          src={Logo3}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt=""
        />
        <span id="RonaRadar"> RonaRadar </span>
      </a>
      
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="/news">
            News
          </a>
          <a className="nav-item nav-link" href="/symptoms">
            Symptoms
          </a>
          
            <button type="button" id="logoutBtn" className="nav-item nav-link btn btn-link px-0 py-0" onClick={logOut}>
                LogOut
            </button>
            


          
          <li className="nav-item dropdown right-aligned" id="dropDownMenu">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Login
              </a>
            <div className="dropdown-menu">
              <form className="px-4 py-3">
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailDropDown"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordDropDown"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="dropdownCheck"
                    />
                    <label className="form-check-label" htmlFor="dropdownCheck">
                      Remember me
                    </label>
                  </div>
                </div>
                <button type="button" id="submitLogin" onClick={submitButton} className="btn btn-primary">Sign in</button>
              </form>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">New around here? Sign up</a>
              <a className="dropdown-item" href="#">Forgot password?</a>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
}


export default NavBar;