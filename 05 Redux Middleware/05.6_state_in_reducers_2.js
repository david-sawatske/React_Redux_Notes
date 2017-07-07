// avoiding state mutations in reducers
// ./reducers/reducer_weather

// what part of the request data unpacked from redux-promise do we want to save?
// 'action.payload.data' from 'FETCH_WEATHER()' Action is what we need
//   log the incoming Action object to console to check out properties to decide

// what data structure to store weather state? want mult rows for mult cities
// - array will be a good fit

import * as types from '../actions/action_types';

export default function(state = [], action) { // initialize state as an array
  switch (action.type) {       // we need a switch statement to handle only the
    case types.FETCH_WEATHER:  // 'FETCH_WEATHER' action type
      return [action.payload.data, ...state]; // array as we will have mult cities
  }                                           // with wanted data from the Action
  return state;                               // ' ...state]' portion means we add
} // new state instance is returned           // new city to current state (ES6)
                                              // * NOT changing state directly *
