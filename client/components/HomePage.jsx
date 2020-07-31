import React from 'react'
import NavBar from './NavBar.jsx';
import USAMap from "react-usa-map";



export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      totalNumDeaths:"",
      totalConfirmedCases:"",
      totalConfirmedRecovered:"",
      error: null
    };
  }

  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  async componentDidMount() {
    try {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://www.who.int/rss-feeds/news-english.xml", requestOptions)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          console.log(data);
          // const items = data.querySelectorAll("item");
          // for(let i = 0; i < items.length; i++) {
          //   console.log(items[i])
          //   if(items[i].querySelector("category").innerHTML == "CDC Newsroom"){
          //     console.log(items[i])
          //   }
          // }
        })
        .catch(error => console.log('error', error));





      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://tools.cdc.gov/api/v2/resources/media/132608.rss", requestOptions)
        .then(response => response.text())
        
        
        .catch(error => console.log('error', error));

      let res = await fetch("https://covidtracking.com/api/states");
      let allStates = await res.json();
      console.log(allStates);
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://thevirustracker.com/free-api?countryTimeline=US";
      let res2 = await fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
      let resBody = await res2.json()
      console.log(resBody);

      var myHeaders = new Headers();
      myHeaders.append("Subscription-Key", "3009d4ccc29e4808af1ccc25c69b4d5d");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let res3 = await fetch("https://api.smartable.ai/coronavirus/stats/US", requestOptions);
      let usStats = await res3.json()
      console.log(usStats)
        let totalDeaths = `Total Deaths: ${usStats.stats.totalDeaths}`;
        let totalCases = `Total Cases: ${usStats.stats.totalConfirmedCases}`;
        let totalRecovered = `Total Recovered: ${usStats.stats.totalRecoveredCases}`;
        console.log(totalDeaths,totalCases,totalRecovered);
        this.setState({
          totalNumDeaths: totalDeaths,
          totalConfirmedCases: totalCases,
          totalConfirmedRecovered: totalRecovered,
          isLoading: false,
        })

    } catch (error) {
      console.log(error);
    }
  }

  statesCustomConfig = () => {
    let all50States = ["NJ", "NY"];
    var jsonData = {};
    for (let i = 0; i < all50States.length; i++) {
      jsonData[all50States[i]] = {
        fill: "navy",
        clickHandler: (event) =>
          console.log(
            `Custom handler for ${all50States[i]}`,
            event.target.dataset
          ),
      };
    }
    return jsonData;
  }

  render() {
    const { isLoading, totalNumDeaths, totalConfirmedCases, totalConfirmedRecovered } = this.state;
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