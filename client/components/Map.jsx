// import React, { Component } from 'react';
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import NavBar from './NavBar.jsx';
import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Logo4 from '../../public/assets/RadarLogo4.png';

import CurrentLocation from '../src/map.jsx';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    placesNearMe: {},
    currentLocation: {},
    placesLoaded: false
  };

  componentDidMount = async () => {
    let coords = {};

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });





      });



    }
  }

  componentDidUpdate = async () => {
    console.log(this.state.currentLocation);

 
    if (!this.state.placesLoaded) {
      console.log("got here...");
      let res = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.currentLocation.lat},${this.state.currentLocation.lng}&rankby=distance&keyword=Covid-19%20Testing%20Site&key=AIzaSyDZu9FOiPgWtv2VpNYMPs_2EU53abSDm3I`);
      let locationsNearMe = await res.json();
      this.setState({
        placesNearMe: locationsNearMe,
        placesLoaded: true
      });
    }
    
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  render() {
 
    return (
    
      <div>
        <NavBar />
        <div id="MapBox">
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            locationCallback={this.setLocation}
          >

            <Marker onClick={this.onMarkerClick} name={'current location'} position={{ lat:this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}/>

            {
              //console.log(this.state.placesNearMe.results)
              this.state.placesNearMe.results?.map((item) => (
                <Marker onClick={this.onMarkerClick} key={item.place_id} name={item.name} address={item.vicinity} position={{ lat: item.geometry.location.lat, lng: item.geometry.location.lng }} />
              ))
            }

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
                <p>{this.state.selectedPlace.address}</p>
              </div>
            </InfoWindow>
          </CurrentLocation>

        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDZu9FOiPgWtv2VpNYMPs_2EU53abSDm3I'
})(MapContainer);