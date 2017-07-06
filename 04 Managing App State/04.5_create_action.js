// verify that the 'selectBook()' can be called and add an Action to it
//  - we made the fn available through 'this.props.selectBook()'

// add click event handler to <li>
// ./containers/book-list

// ...
class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)} // when this li is clicked,
          className="list-group-item">                // call selectBook(book)
          {book.title}                                // Action Creator
        </li>
      );
    });
  }
// ...


// enhance the 'selectBook(book)' Action Creator to return a useable action
//  - the Action is an object which always contains 'type' property
export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',  // normally a symbol extracted to seperate file
    payload: book           // 'payload' contains info on the action being undertaken
  };
}


// Need to create ActiveBook Reducer
// new file ./reducers/reducer_active_book.js

// Reducers recieve 2 args, state and action
//  - Reducers are only ever called when an action occurs
//  - 'state' refers to the state that this Reducer is responsible for
//    * not the Application state *

// this Reducer will be called every time an action is dispatched by App (often)
//  - need base case to return unaffected state if current action does not matter
export default function(state = null, action) { // 'null' for when App boots up
  switch (action.type) {      // JS switch statement looks at action type and
    case 'BOOK_SELECTED':     // decides on whether to change state based on it
      return action.payload;  // if action is 'BOOK_SELECTED' we return the
  }                           // action.payload, which is the selected book
  return state;  // return current state if no changes are made
}

// Reducers need to be connected into the Combined Reducer statement in index.js
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ActiveBook from './reducer_active_book'; // here

const rootReducer = combineReducers({
  books: BooksReducer
  activeBook: activeBook // add to combineReducers call as another piece of state
});                      // - reminder: any key to the object provided to
                         //   combineReducers is a key on the global state
export default rootReducer;
