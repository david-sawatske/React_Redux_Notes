// Cities list Container - why container vs component?
// - needs access to Redux state where list of cities persists

// new file ./containers/weather_list
// boiler plate for React and HTML table for cities list
import React, {Component} from 'react';

export default class WeatherList extends Component {
  render() {
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    );
  }
}

// render WeatherList component inside ./components/app
// ...
import WeatherList from '../containers/weather_list'; //

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <WeatherList />  //
// ...


// getting data from Redux into WeatherList container
// 1. import 'connect()' fn from react-redux
// 2. define fn 'mapStateToProps'
// 3. pull weather data into container
import React, { Component } from 'react';
import { connect } from 'react-redux';  // 1.

class WeatherList extends Component {  // remove 'export default'
  render() {
    return(
      <table className="table table-hover">
// ...
}

function mapStateToProps({ weather }) { // 2. pulling one prop from one argument
  return { weather };                   //    special ES6 syntax used
}

// alt version
function mapStateToProps(state) {
  return { weather: state.weather };
}

export default connect(mapStateToProps)(WeatherList); // 3.
// now have acces to 'this.props.weather' inside of WeatherList


// Building list of rows - one row == one city
// our Redux state has a single property 'weather:' as an array of objects
// each obj has a city and a list of weather data
// to produce rows, map over 'this.props.weather' for each city
// still in ./containers/weather_list
export default class WeatherList extends Component {
  //defining the 'renderWeather' used in the <tbody>
  class WeatherList extends Component {
    renderWeather(cityData) { // single city and it's weather data from API
      return (
        <tr>
          <td>{cityData.city.name}</td> // 'city.name' is a prop returned fro
        </tr>                           // AJAX req from API
      )
    }

  render() {
    return(
    //...
        </thead>
        <tbody>// array of els, maping over and calling fn 'renderWeather' on each
          { this.props.weather.map(this.renderWeather) }
        </tbody>
      </table>
    );
  }
}

// when rendering a list, a unique key property is needed
// always add key to top level element when adding a key to a React list
// ...
renderWeather(cityData) {
  return (
    <tr key={cityData.city.name}>    // 'city.name' returns a strin that will
      <td>{cityData.city.name}</td>  // provide unique key required
    </tr>
  )
}
// DRY it out
renderWeather(cityData) {
  const cityName = cityData.city.name; // extracted 'cityData.city.name'
  return (
    <tr key={cityName}>
      <td>{cityName}</td>
    </tr>
  )
}
