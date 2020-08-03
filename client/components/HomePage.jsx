import React from 'react'
import NavBar from './NavBar.jsx';
import USAMap from "react-usa-map";
import { Redirect } from 'react-router-dom';



export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      totalNumDeaths: "",
      totalConfirmedCases: "",
      totalConfirmedRecovered: "",
      allStates: [],
      error: null,
      redirect: null
    };
  }

  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  async componentDidMount() {
    try {

      let res = await fetch("https://covidtracking.com/api/states");
      let allStates = await res.json();

      var myHeaders = new Headers();
      myHeaders.append("Subscription-Key", "3009d4ccc29e4808af1ccc25c69b4d5d");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let res3 = await fetch("https://api.smartable.ai/coronavirus/stats/US", requestOptions);
      let usStats = await res3.json();
      let totalDeaths = `Total Deaths: ${usStats.stats.totalDeaths}`;
      let totalCases = `Total Cases: ${usStats.stats.totalConfirmedCases}`;
      let totalRecovered = `Total Recovered: ${usStats.stats.totalRecoveredCases}`;
      console.log(totalDeaths, totalCases, totalRecovered);
      this.setState({
        totalNumDeaths: totalDeaths,
        totalConfirmedCases: totalCases,
        totalConfirmedRecovered: totalRecovered,
        isLoading: false,
        allStates: allStates
      })

    } catch (error) {
      console.log(error);
    }
  }

  statesCustomConfig = () => {
    let all50States = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
    var jsonData = {};

    for (let i = 0; i < all50States.length; i++) {
      let stateColor = "";
      let thisState = this.state.allStates[i]?.positiveIncrease;
      switch (true) {
        case thisState < 500:
          stateColor = "#f2df91"
          break;
        case thisState < 1000:
          stateColor = "#ffae43"
          break;
        case thisState < 3500:
          stateColor = "#ff6e0b"
          break;
        case thisState < 10000:
          stateColor = "#ce0a05"
          break;
        case thisState < 20000:
          stateColor = "#ce0a05"
          break;

        default:
          stateColor = "#808080"
          break;
      }
      jsonData[all50States[i]] = {
        fill: stateColor,
        clickHandler: (event) => {
          this.setState({
            redirect: `/state/${this.state.allStates[i]?.state}`
          })
          console.log(
            `Custom handler for ${all50States[i]}`,
            event.target.dataset,
          )
        }
      };
    }
    return jsonData;
  }



  render() {
    if(this.state.redirect) {
      return < Redirect to= {this.state.redirect} />
    }
    const { totalNumDeaths, totalConfirmedCases, totalConfirmedRecovered } = this.state;
    return (
      <div className="App">
        <NavBar />
        <h1>RonaRadar</h1>
        <p>{totalNumDeaths}</p>
        <p>{totalConfirmedCases}</p>
        <p>{totalConfirmedRecovered}</p>
        <div className="d-flex justify-content-center">
          <USAMap
            customize={this.statesCustomConfig()}
            onClick={this.mapHandler} />
        </div>
      </div>
    )


  }
}