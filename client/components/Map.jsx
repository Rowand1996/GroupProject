import React from "react";
import NavBar from './NavBar.jsx'
import mapStyles from './mapStyles.js'
import Search from './Search.jsx'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';

 
const containerStyle = {
  width: '100vw',
  height: '100vh'
};
 
const center = {
  lat: 33.522861,
  lng:  -86.807701
};

const options = {
  styles: mapStyles
}
 
function Map() {

 
  return (
  <>
  <NavBar />
<div> 
 
    <LoadScript
    
      googleMapsApiKey="AIzaSyDZu9FOiPgWtv2VpNYMPs_2EU53abSDm3I"
    > 
    <Search />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
      
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
      
        
      </GoogleMap>
    </LoadScript>
    </div>
  
    </>
  )
}
 
export default React.memo(Map)