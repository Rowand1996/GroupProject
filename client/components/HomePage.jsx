import React from 'react'
import NavBar from './NavBar.jsx';
import USAMap from "react-usa-map";



export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: null,
    // };
  }

  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  async componentDidMount() {
    try {
      let res = await fetch("https://covidtracking.com/api/states");
      let allStates = await res.json();
      console.log(allStates);
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
    return (
      <div className="App">
        <NavBar />
        <h1>RonaRadar</h1>
        <div className="d-flex justify-content-center">
          <USAMap
            customize={this.statesCustomConfig()}
            onClick={this.mapHandler} />
        </div>
      </div>
    )


  }
}