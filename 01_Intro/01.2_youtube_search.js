// Creating the Youtube App //
// always one component per file
// - makes it easier to resuse code through out the application

// 1. create YouTube API key w Google and set to const in index.js
const API_KEY = 'AIzaSyAnIwax8vSDFdTpWnYrHNKsBxIQRheoeUY';

// 2. install YouTube API search packet
//   $ npm install --save youtube-api-search


// SearchBar //
// 1. declare new component and export component from file
// search_bar.js
import React from 'react';

const SearchBar = () => { // a Functional Component - info in, JSX out
  return <input />;       // this JSX would throw an error without 'import React'
};

export default SearchBar; // we only want to export the SearchBar portion
// to access in other files: import SearchBar from './components/search_bar';
// - need to give path for files we create (not for packages installed with NPM)

// 3. import component and render it inside app component
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyAnIwax8vSDFdTpWnYrHNKsBxIQRheoeUY'

// inserting a SearchBar component inside the App component
const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

// insert HTML in DOM
ReactDOM.render(<App />, document.querySelector('.container'));


// //
// creating a class based (not functional) component for search_bar
// - use class component when we want something to have internal record keeping
// - keeps track of what has happened to it since it was rendered
import React from 'react';

// creates JS class object with all functionality of the React.Component class
class SearchBar extends React.Component {
  render() {   // all class based React component must have render function defined
    return <input />; // must have JSX to return from the method
  }
}

export default SearchBar;

// cleaner way to do above
import React, { Component } from 'react'; // pulls the property 'Component'
                                          // as var called 'Component'
class SearchBar extends Component {
  render() {
    return <input />;
  }
}

export default SearchBar;

// //
// handling events in React
// 1. declare event handler (a funct that is run whenever event occurs)
// 2. pass event handler to the element we want to monitor for events

// 2. passing the event to the el that we want to monitor
class SearchBar extends Component {
  render() {
    return <input onChange={this.onInputChange} />;
  }
// all HTML els have 'Change' event
// 'onChange' with reference to the event handler (below) taps into event
//  - 'onChange' is a property set to the input on the page
//  ex <input onChange={this.onInputChange} />

// 1. we want to know when the text inside the search bar has changed
  // adding event handler
  // name is common 'Input' = el watched for event/ 'Change' = event

  // the event describes the context/ about the event that occured
  // - here we are logging every time the text in the search bar changes
  onInputChange(event) {
    console.log(event.target.value);
  }
}

// cleaner class with arrow function
class SearchBar extends Component {
  render() {
    return <input onChange={(event) => console.log(event.target.value)} />;
  }
}
