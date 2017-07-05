// continued //

// check that the Reducer has generated state for the app
// create a book list component within React
//    - it's only purpose is to render a list of books

// ./src/components/book-list.js
import React, { Component } from 'react';

export default class BookList extends Component {
  renderList() { // creating a fn that will render the list
    return this.props.books.map((book) => { // need to plug in state as this.props.books
      return (
        <li key={book.title} className="list-group-item">{book.title}</li>
      );
    });
  }
}

render() {
  return (
    <ul className="list-group col-sm-4"> // create a <ul> to house <li> from fn
      {this.renderList()}  // calling the list building fn created above
    </ul>
  )
}

// how to plug in state as this.props.books?
// need to combine React views and Redux state to generate a useable application
//  - these two seperate libraries are connected with a 3rd called ReactRedux

// 1. define one of our components as a container instead of component
//  - container is a React component that has a direct connection to state,
//    which is managed by Redux
//  - containers create a bridge to inject state into a React component
//  - also called a smart component

// how to decide what components to make into containers
//  => the most parent component that cares about a paritcular piece of state
//    - App? does not care when state changes - no
//    - BookDetail? only cares about the state of the active book - yes
//    - BookList? only cares about state changes to the book list - yes

// create a containers folder in the app and move the book-list.js file into it

// quickly make sure that App is making use of BookList
// ../src/components/app.js
import BookList from '../containers/book-list'; // add import

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList /> // return BookList to check
      </div>
    );
  }
}

// continued
