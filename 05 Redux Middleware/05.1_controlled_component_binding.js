// Planning Weather App //

// Making AJAX requests with Redux
//  - logic should be centralized in Reducers and Actions
//  - React components are only responsible for showing data

// Components //
// 1. App - ties others together and renders them on the page
// 2. SearchBar - will call Action Creator in Redux
// 3. ForecastList - one components that creates table and knows items inside
// 4. Chart - single component to accept data (reuseable components)

// SearchBar Container - needs to call ActionCreator which will affect state
// create ./containers/search_bar.js

import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <form className="input-group">  // add search input and submit button
        <input />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}


// insert container into App ./components/app.js
import React, { Component } from 'react';

import SearchBar from '../containers/search_bar' // add here

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar /> // include component
      </div>
    );
  }
}


// Turning input into Controlled Field
// - a form element where the value of the input is set by state of Component
//   * state what the input is declaratively  'this.state.'
// - Component state is set whenever input is changed

//./containers/search_bar.js

export default class SearchBar extends Component {
  constructor(props) { // initialize Component state inside the constructor
    super(props);

    this.state = { term: '' }; // the value of the search input will be mapped
  }                            // to 'this.state.term' (empty string default)

//  now we can update state over time with event handler on input
  render() {
    return (
      <form className="input-group">
        <input
          placeholder="Get a five-day forcast"
          className="form-control"          // below is what make a Controlled Comp
          value={this.state.term}           // value is input of search bar from state
          onChange={this.onInputChange}/>   // when changed, run fn onInputChange
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}

// we need to define the fn onInputChange in SearchBar Class
// ...

onInputChange(event) { // all DOM event handlers come with 'event' obj
  console.log(event.target.value);
  this.setState({ term: event.target.value }) // updates this.state.term (keeps
                                              // value of input displayed in bar)
  // when we pass off an event handler (this.onInputChange in render() fn), the
  // value of 'this' is not going to be the React Component.
  //   - gives error "property 'setState' undefined"  (can't find it from 'this')
}

render() {
  return (
// ...
// //
// ...
// fix for error "property 'setState' undefined" (can't find it from 'this')
export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    // says 'this' (SearchBar instance) has fn called 'onInputChange'
    // bind that fn to 'this' (SB) and replace 'onInputChange' with the new
    // bound instance of the fn with the same name, 'onInputChange'
    // - replace existing fn with an identical bound instance on the fn
  }
// ...
