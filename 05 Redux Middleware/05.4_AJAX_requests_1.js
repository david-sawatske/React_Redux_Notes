// calling an Acion Creator (dispatch action) to load the weather data
//  => AC is responsible for the AJAX request
//  => loading weather data will change App state

// creating the Action Creator to fetch weather data with AJAX request
// => ACs always return an action object which always has prop 'type'
// ./actions/index

// extracting type to a seperate const and export it
`export const FETCH_WEATHER = 'FETCH_WEATHER';`
// this keeps action types consistant between containers and reducers

export function fetchWeather() {
  return {
    type: FETCH_WEATHER
  };
}

// put together a URL and making an AJAX get request to it, which returns weather
// install axios library - made for making AJAX requests from the browser
//  => works much like jQuery
$ npm install --save axios
// ./actions/index

import axios from 'axios';
import * as types from './action_types';

const API_KEY='84b5a49ad93ba8326121a04a18420eb7';
// the base that all URls will share
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

// we also need to add the city (from the search term) to the URL
export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`; // final URL with info from search term
  const request = axios.get(url);         // axios makes the AJAX get request
                                          // axios returns a promise (a data
                                          // that does not contain req data)

  return {
    type: types.FETCH_WEATHER,
    payload: request // passing the request (promise) into the return as the payload
  };
}

// Call Action Creator 'fetchWeather()' whenever the user submits the form
//  - we need to connect the SearchBar Container to Redux using the
//    connect method from react-redux library
//  - also need to bind Action Creator 'fetchWeather()' as a prop to the container
// ./containers/search_bar

import { connect } from 'react-redux';           // add for
import { bindActionCreators } from 'redux';      // the container
import { fetchWeather } from '../actions/index'; // setup

// ...
// calling the AC 'fetchWeather' we make available below
onFormSubmit(event) {
  event.preventDefault();

  this.props.fetchWeather(this.state.term); // passing in the search input
  this.setState({term: ''}); // clears the search input after submit
}

// ...
// hooking up the ActionCreator 'fetchWeather' to SearchBar container
// - when AC is called the Action it creates gets passed to all Reducers, first
//   going through middleware (done by the 'dispatch' fn arg from react-redux)
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchWeather}, dispatch);
}

// remove 'export default' from the class above and add this export
export default connect(null, mapDispatchToProps)(SearchBar);
// null is a placeholder as the fn mapDispatchToProps needs to be 2nd argument
//  previously we had 'state' there, but it is not needed here

// by binding the AC 'fetchWeather' to 'dispatch' and mapping it to props,
// we get access to this.props.fetchWeather fn inside of SearchBar component
