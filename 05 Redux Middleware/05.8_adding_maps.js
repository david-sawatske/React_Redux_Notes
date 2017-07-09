// create component to house maps
// - just passing in props from parent component, no need for state
// the project is wired for google maps with their API
// ./index.html
<script src="https://maps.googleapis.com/maps/api/js"></script>
// this is a 3rd party library that already knows how to render a map on the page
// - it does not know how to integrate into a React App

// GENERALLY HOW TO MAKE 3rd PARTY LIBRARY INTERACT WITH REACT

// new file ./components/google_map.js
import React, { Component } from 'react';

class GoogleMap extends Component {
  componentDidMount() {  // component rendered, this lifecycle method is called
    new google.maps.Map(this.refs.map, { // created embedded map in document
      zoom:  12,              // arg1 - ref to HTML node where the map will render
      center: {               // arg2 - options object
        lat: this.props.lat,
        lng: this.props.lon   // 'lon' from weather API, 'lng' used by GMaps
      }
    });
  }

  render() {
    return <div ref="map" />; // 1. using React 'ref' system
  }
}

export default GoogleMap;
// 1. gives direct reference to HTML el that has been rendered to the page
//    - once component has been rendered, we have a direct ref to the div
//       * 'this.refs.map' is now available anywhere in the component


// integrate this GoogleMap component into the row
// ./containers/weather_list
// ...
import GoogleMap from '../components/google_map'
// ...
const {lat, lon} = cityData.city.coord; // from weather API to pass to 'GoogleMap'
// ...
class WeatherList extends Component {
  renderWeather(cityData) {
    // ...
    return (
      <tr key={cityName}>
        <td><GoogleMap lon={lon} lat={lat} /></td> // with props from weather API
        <td><Chart data={temps} color="orange" units="K" /></td>
        <td><Chart data={pressures} color="green" units="pHa" /></td>
        <td><Chart data={humidities} color="blue" units="%" /></td>
      </tr>
    );
