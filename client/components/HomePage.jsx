import React from 'react'
import NavBar from './NavBar.jsx';
import USAMap from "react-usa-map";
import { Redirect } from 'react-router-dom';
import numeral from 'numeral'




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

      let totalDeaths = `${usStats.stats.totalDeaths}`;
      let totalCases = `${usStats.stats.totalConfirmedCases}`;
      let totalRecovered = `${usStats.stats.totalRecoveredCases}`;

      this.setState({
        totalNumDeaths: numeral(totalDeaths).format('0.0a'),
        totalConfirmedCases: numeral(totalCases).format('0.0a'),
        totalConfirmedRecovered: numeral(totalRecovered).format('0.0a'),
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
              stateColor = "#f2df91"
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
              <p className="firstPTag">TOTAL CASES</p>
              <p className="totalConfirmed">{totalConfirmedCases}</p>
              <p className="secondPTag">TOTAL RECOVERED</p>
              <p className="totalRecovered">{totalConfirmedRecovered}</p>
              <p className="thirdPTag">TOTAL DEATHS</p>
              <p className="totalDeaths">{totalNumDeaths}</p>
            </div>
            <div className="legendContainer">
              <p className="legendTxt">Number Of Cases</p>
              <div className="legend">
                <div className="firstItem">
                  <p className="ConnectorLine">|</p>
                  <p className="ConnectorLineTxt">0 - 500</p>
                </div>
                <div className="secondItem">
                <p className="ConnectorLine">|</p>
                <p className="ConnectorLineTxt">501 - 1,000</p>
                </div>
                <div className="thirdItem">
                <p className="ConnectorLine">|</p>
                <p className="ConnectorLineTxt">1,001 - 3,500</p>
                </div>
                <div className="forthItem">
                <p className="ConnectorLine">|</p>
                <p className="ConnectorLineTxt">3,501 - 10,000</p>
                </div>
                <div className="fifthItem">
                <p className="ConnectorLine">|</p>
                <p className="ConnectorLineTxt">10,001 - 100,000</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )


  }
}