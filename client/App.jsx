import React, { Component } from "react";
import HomePage from './components/HomePage.jsx';
import Symptoms from './components/Symptoms.jsx';
import News from '../client/components/News.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => { 
    return (  
          <Router>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/symptoms' component={Symptoms} />
              <Route path='/news' component={News} />
            </Switch>
          </Router>
        
    );
  }


export default App;
