// Downwards Data Flow - only the most parent component of the app should
//                       be responsible for fetching data

// index is the most parent component of the YT app
//  => other components will be children of App component defined there

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'; // adds YT search package we added

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyAnIwax8vSDFdTpWnYrHNKsBxIQRheoeUY';

// change App from Functional component to Class based component
//  => this will allow the App to keep track of the list of videos on it's state

// 1. Add '{ Component }' to the import of React & extend to App class
// 2. Added render method and moved the return into it

// when user enters new data, we need to conduct new search and set the results
// of that search to state. done with constructor function

// 3. setup constructor function with discriptive property name 'videos'
//    => prop 'videos' is an array which will be a list of objects
// 4. add YT search function
// 5. update state with the newly searched list of videos
//    => having the object passed to state named 'videos' as the key and the value
//       named 'videos' from the argument in YTSearch we can use ES6 shorthand
//       - { videos: videos } === { videos }
//       - ie when object has key and val are identical terms

// now when ever the App first boots, we get an instance of App. the constructor
// is run with new instance and YTSearch will run. the callback function 'data'
// will be called giving an opportunity to update state with a list of videos
class App extends Component = () => {
  constructor(props) {
    super(props);

    this.state = { videos: [] };

    YTSearch({key: API_KEY, term: 'testing'}, (videos) => {
      this.setState({ videos });
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.querySelector('.container'));
