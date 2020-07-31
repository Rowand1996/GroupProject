import React, { Component } from "react";
import HomePage from './components/HomePage.jsx';
import Symptoms from './components/Symptoms.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// import $ from 'jquery';






const App = () => { 
    return (  
          <Router>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/symptoms' component={Symptoms} />
            </Switch>
          </Router>
        
    );
  }


export default App;
