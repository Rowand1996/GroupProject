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

      let res = await fetch("https://covidtracking.com/api/states/daily");
      let allStates = await res.json();
      var myHeaders = new Headers();
      myHeaders.append("Subscription-Key", "3009d4ccc29e4808af1ccc25c69b4d5d");
      console.log(allStates);
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

    let today = this.state.allStates[0]?.date;

    for (let i = 0; i < this.state.allStates?.length; i++) {
      if (this.state.allStates[i]?.date === parseInt(today)) {
        if (all50States.includes(this.state.allStates[i]?.state)) {
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
            case thisState < 100000:
              stateColor = "#8B0000"
              break;

            default:
              stateColor = "#808080"
              break;
          }

          jsonData[this.state.allStates[i]?.state] = {
            fill: stateColor,
            clickHandler: (event) => {
              this.setState({
                redirect: `/state/${this.state.allStates[i]?.state}`
              })
              // console.log(
              //   `Custom handler for ${this.state.allStates[i]?.state}`,
              //   event.target.dataset,
              // )
            }
          };
          // console.log(jsonData);
        }

      } else {
        return jsonData;
      }
    }


    return jsonData;

  }



  render() {
    if (this.state.redirect) {
      return < Redirect to={this.state.redirect} />
    }
    const { totalNumDeaths, totalConfirmedCases, totalConfirmedRecovered } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div id="main">
          <div className="d-flex justify-content-center">
            <div>
              <div className="mapHeader d-flex justify-content-center">
                <span id="mapTitle">Daily New Infected</span>
              </div>
              <USAMap
                customize={this.statesCustomConfig()}
                onClick={this.mapHandler}
              />
            </div>
            <div className="mainInfo">
              <p className='shade'>{totalNumDeaths}</p>
              <p className='shade'>{totalConfirmedCases}</p>
              <p className='shade'>{totalConfirmedRecovered}</p>

            </div>
          </div>
        </div>
      </div>
    )


  }
}