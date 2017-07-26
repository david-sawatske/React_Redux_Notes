// Redux Thunk - Aids with handling asynchronous Action Creators
//  - much more common to call an Action Creator and fetch data
//    from an API or some other asynchronous action
//    * only when that request is resolved are we ready to create an action

// Redux Thunk gives direct control over the 'dispatch' method
// - 'dispatch' is a part of the Redux store that holds application state
//   * the Action Creator hands the created Action to 'dispatch' method
//   * handles the middleware => Reducers => state part of the cycle
//   * 'dispatch' makes sure the action gets sent to all of the Reducers


// has single Action Creator 'fetchUsers()'
// - makes API request and return the data back to the Reducers
// - 'request' will not have any data until the it is complete

// vanilla Redux expecting us to return a plain JS object

// Redux Thunk allows for the return of a plain JS funciton
// 'dispatch' is the 1st argument
// 1. wait for the request to resolve with some sort of data
// 2. dispatch an Action 'type: 'FETCH_PROFILES', payload: data' in this case

// app component (app.js) calls Action Creator 'fetchUsers()' => axios makes
// request to API => Thunk allows for return of fn => Thunk sees that the return
// is a fn and envokes it with the 'dispatch' method => time passes ... =>
// API request resolves => the 'dispatch' method is called with the data we
// want to send to the Reducers

// sample_app/src/actions/index
import axios from 'axios';

export function fetchUsers() {
  const request = axios.get('urlforAPIrequest.com')

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({ type: 'FETCH_PROFILES', payload: data })
    });
  };
}
