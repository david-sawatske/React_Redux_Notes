// State - JS object used to record and react to user events
//  => each class based component has it's own state object
//  => when a component's state changes, it (and all children)immediately rerenders
//     - functional components do not have state

import React, { Component } from 'react';

class SearchBar extends Component {
  // how to initialize state in a class based component
  constructor(props) {
    super(props); // takes functionality from Component

    // initialize state by creating a new object with properties
    //  => 'term' is where we will record the change to the input to search bar
    this.state = { term: ''}; // this is the only time we will change state
  }                           // with 'state = ...' (use this.setState elsewhere)

  render() {
    return <input onChange={event => console.log(event.target.value)} />;
  }
}

export default SearchBar;

// //
// Recording the value of the input on the state within the function handler
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};
  }

  render() {
    return (
      <div>
        <input onChange={event => this.setState({ term: event.target.value})} />;
       // using 'this.setState' to change state based on the input to search bar

// to see the change of updating funtion handler //
// when we change the value of 'input onChange', the event handler fn runs
// which sets the state (this.state.term) with the new val for 'inputOnchange'
// when we change state, component rerenders and is pushed to DOM
// ie the '{ this.state.term }' object is pushed to the DOM

        Value of input: {this.state.term} // shows what is typed in to search bar
      </div>                              // next to it
    );
  }
}

export default SearchBar;
