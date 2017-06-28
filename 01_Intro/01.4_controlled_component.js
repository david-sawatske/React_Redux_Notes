// Controlled Field - form input who's value is set by the state, not visa versa
//  => state gives current value to the input
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};
  }

  render() {
    return (
      <div>
        <input
        // the 'input' element becomes a Controlled Component when the 'value'
        // is provided by 'this.state.term'
        // Controlled Component's value only changes when state changes
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value})} />;
        // 1. 'this.setState' runs and causes component to rerender upon event
        //    - onChange has changed, but the value has not yet
        // 2. 'this.setState' results in a rerendering
        // 3. 'value={this.state.term}' changes with updated state
        // 4. the component finishes rendering
        // 5. new 'value' is visable on the screen
        // ** when the user types into search, they did not change the value,
        //    they only triggered an event. Because we updated the state in that
        //    event, the component is rerenderd and new value is set with the
        //    updated state **
      </div>
    );
  }
}

export default SearchBar;
