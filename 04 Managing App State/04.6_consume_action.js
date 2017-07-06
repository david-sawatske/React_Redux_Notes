// Book Detail Container - container as it needs state
// new file  ./containers/book-detail

// create Container which needs to be hooked up to the Redux store
//  - this will allow it to be told about changes to activeBook
import React, {Component} from 'react';
import {connect} from 'react-redux';

class BookDetail extends Component {
  render()
  {
    return (
      <div>Book Details<div>
    );
  }
}

// render the new Container with in App
// ./components/app.js

import React, { Component } from 'react';

import BookList from '../containers/book-list';
import BookDetail form '../containers/book-detail' // add import

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
        <BookDetail /> // add to render method
      </div>
    );
  }
}


// the BookDetail Container  needs to be hooked up to the Redux store
//  - this will allow it to be told about changes to activeBook

// import connect() helper from 'react-redux'
// and connect App state to the props of BookDetail container

import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component { // removed the 'export default'
  render()  {
    return (
      <div>Book Details</div>
    );
  }
}

function mapStateToProps(state){ // argument of Application state
  return {
    book: state.activeBook // the object returned here will show up as
  };                       // props in the BookDetail
}                          // it is 'activeBook' because activeBook Reducer is
                           // creating the activebook piece of state (index.js)

 // Promote BookDetail from Component to Container, it needs knowledge of new
 // dispatch method 'BookDetail'. Make it available as a prop
export default connect(mapStateToProps)(BookDetail);
