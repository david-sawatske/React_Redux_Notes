// we can now make use of 'this.props.book' in BookDetail container because
// we mapped our App state to the props of BookDetail (mapStateToProps())

// add check to render method of BookDetail to avoid errors when app boots
// ./containers/book-detail
class BookDetail extends Component {
  render()
  {
    if (!this.props.book) // when App boots, there is no selected book in state
    {                     // conditional asks to choose, putting one into state
      return (<div>Select a book</div>);
    }
    return (
      <div>
        <h3>{this.props.book.title}</h3>  // when there is a book in state,
        <h3>{this.props.book.pages}</h3>  // we can render the info
      </div>                              // book properties can be added to
    );                                    // reducer_books.js (ie pages)
  }
}
// ...

// REMEMBER
// Redux is in charge of Application State, a single plain JS object
//  - App state is NOT Component state. they are completely seperate
//    * we can still do 'this.setState({something: something})' within components

// Application State is formed by Reducers (fn that returns a piece of App state)
//  - Reducers get tied toether with combineReducers() method in reducers/index.js
//    * we assign one Reducer to each key in combineReducers() obj
//    * that Reducer is responsible for that specific piece of state
//      ie 'activeBook: ActiveBook' whatever ActiveBook returns will be
//          available as activeBook piece of state

// Reducers are responsible for changing App state over time through use of Actions
//  - when an action is dispatched, it flows through all Reducers in App
//  - Reducers decide what state to return based on what action is recieved

// Actions - plain JS object, always with type property and optional properties
