// import React, { Component } from 'react';
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import NavBar from './NavBar.jsx';
import React, { Component, Fragment } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import OrangeMarker from '../../public/assets/orangeMarker.png';
import RedMarker from '../../public/assets/redMarker.png';

import CurrentLocation from '../src/map.jsx';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    placesNearMe: [],
    currentLocation: {},
    placesLoaded: false,
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
      let tempPlaceData = [];
      
      if(locationsNearMe.results?.length > 10){
        locationsNearMe.results.splice(10,(locationsNearMe.results.length - 10));
      }
      
      for (let i = 0; i < locationsNearMe.results?.length; i++) {
        let res2 = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${locationsNearMe.results[i].place_id}&fields=formatted_address,formatted_phone_number&key=AIzaSyDZu9FOiPgWtv2VpNYMPs_2EU53abSDm3I`)
        let additionalData = await res2.json();
        let placeName = locationsNearMe.results[i].name.split(" ").join("+");
        let mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${placeName}&destination_place_id=${locationsNearMe.results[i].place_id}&origin=${this.state.currentLocation.lat},${this.state.currentLocation.lng}`;       
        tempPlaceData.push({
          nearMeData: locationsNearMe.results[i],
          additionalPlaceData: additionalData.result,
          directionsUrl: mapUrl
        });
      }
      this.setState({
        placesNearMe: tempPlaceData,
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
      <Fragment>

        <div>
          <NavBar />
          <div id="MapBox">
            <CurrentLocation
              centerAroundCurrentLocation
              google={this.props.google}
              locationCallback={this.setLocation}
            >

              <Marker onClick={this.onMarkerClick} name={'current location'} position={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }} icon={OrangeMarker} />

              {
                //console.log(this.state.placesNearMe.results)
                this.state.placesNearMe?.map((item) => (
                  <Marker onClick={this.onMarkerClick} key={item.nearMeData.place_id} name={item.nearMeData.name} directionsUrl={item.directionsUrl} address={item.additionalPlaceData.formatted_address} phoneNumber={item.additionalPlaceData.formatted_phone_number} position={{ lat: item.nearMeData.geometry.location.lat, lng: item.nearMeData.geometry.location.lng }} icon={RedMarker}/>
                ))
              }

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                  <p className="infoBoxItem">{this.state.selectedPlace.address}</p>
                  <p>{this.state.selectedPlace.phoneNumber}</p>
                  <a href={this.state.selectedPlace.directionsUrl} target="_blank" id="infoDirectionsButton" className="btn">Get Directions</a>
                </div>
              </InfoWindow>
            </CurrentLocation>
          </div>
        </div>

        <div id="cardBox">
          {
            this.state.placesNearMe?.map((newItem) => (
              <div className="d-flex justify-content-center" key={newItem.nearMeData.place_id}>
                <div id="directionsCard" className="card">
                  <div className="card-body">
                    <h5 className="card-title">{newItem.nearMeData.name}</h5>
                    <p className="infoBoxItem">{newItem.additionalPlaceData.formatted_address}</p>
                    <p className="infoBoxItem2">{newItem.additionalPlaceData.formatted_phone_number}</p>
                    <p className="infoBoxItem"> Is Store Open: {newItem.nearMeData.open_now == false ? "Closed" : "Open"}</p>
                    <p className="infoBoxItem2"> Rating: {newItem.nearMeData.user_ratings_total}</p>
                    <a href={newItem.directionsUrl} target="_blank" id="directionsButton" className="btn">Get Directions</a>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDZu9FOiPgWtv2VpNYMPs_2EU53abSDm3I'
})(MapContainer);