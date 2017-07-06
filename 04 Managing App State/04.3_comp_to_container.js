// create a containers folder in the app and move the book-list.js file into it

// promoting a component to container by forming React Redux connection
// connection is forged by ReactRedux

// Goal: connection from Redux to get state into book-list
//  => BookList will then have access to 'this.props.books'

import React, { Component } from 'react';
import { connect } from 'react-redux';  // pull off single property with {}
                                        // - 'connect()' fn in this case

class BookList extends Component { // no longer 'export default'
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li key={book.title} className="list-group-item">{book.title}</li>
      );
    });
  }

  render() {
    return (
        {this.renderList()}
      </ul>
    )
  }
}

// write a function who's return will show up as 'props' inside bookList
function mapStateToProps(state) { // takes app entire app state as arg
  return {                        // returns an object
    books: state.books            // 'books' prop available to the component
  };                              //   - this contains info on App state
}

// connect fn imported from react-redux above takes two args, a fn and component
// with those, it produces a container (which is then aware of state)
export default connect(mapStateToProps)(BookList);



// Addditional points about using connect() fn
// when App state changes, containers will instantly re-render and the obj in
// the state fn (mapStateToProps(state) above) will be assiged as props
// to the component. in this case as this.props.books
