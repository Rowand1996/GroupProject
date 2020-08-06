import React, { Component } from "react";
import HomePage from './components/HomePage.jsx';
import Symptoms from './components/Symptoms.jsx';
import News from '../client/components/News.jsx';
import statePage from './components/statePage.jsx';
import Map from './components/Map.jsx'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => { 
    return (  
          <Router>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/news' component={News} />
              <Route exact path='/symptoms' component={Symptoms} />
              <Route path='/state/:id' component={statePage} />
              <Route path='/map' component={Map}/>
            </Switch>
          </Router>
        
    );
  }


export default App;
