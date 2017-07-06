// at this point the App state is static, just the list of books

// Action Creator - a function that returns an action
// Action - an object that flows through all of the Reducers

// 1. book list item is clicked, Action Creator is triggered
// 2. Action creator returns an object that is automatically sent to all Reducers
//    - ex object { type: BOOK_SELECTED, payload: {title: 'Book 2'}}
// 3. Reducers can choose a different piece of state, depending on the action
//    - behavior is set by a switch statement in Reducer which reads 'type'
//    - Reducer returns a new value of state (or current state if no change)
// 4. that new state is piped into all of the containers of the application,
//    changing the App's state by running the fn 'mapStateToProps(state)'
// 5. new state is pumped into App causing all components to re-render


// Funcitonality Goal - User clicks book from list, sees more info about it

// Defining Action Creator 'selectBook()'
// ./actions/index.js
export function selectBook(book) { // 'book' is object with a title
  console.log(book.title);
}

// the action returned from the Action Creator runs through all Reducers
//  - the Action Creator needs to be wired to Redux

// ./containers/book-list.js
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';  // 'bindAct..()' the fn helps
                                             // Action created flow through
                                             // all the Reducers in App
class BookList extends Component {
  renderList() {
// ...
// the return of this fn will end up as props on the BookList container
function mapDispatchToProps(dispatch) {
  // when selectBook is called, the resulting Action created should be passed
  // to all reducers, this is done by 'bindActionCreators(obj, dispatch)'
  //  - the val passed in 'selectBook: selectBook' is the Action Creator
  //  - the 'dispatch' arg is a fn that takes the result of 'selectBook()' and
  //    spits them to all of the Reducers in the App
  return bindActionCreators({ selectBook: selectBook }, dispatch)
  // because of the 'selectBook' key, we can call 'this.props.selectBook'
  // which will call the Action Creator
}

// Promote BookList from Component to Container, it needs knowledge of new
// dispatch method 'selectBook'. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
