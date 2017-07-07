// Create reducer for handling the FETCH_WEATHER Actio
// new file ./reducers/reducer_weather

import * as types from '../actions/action_types';

export default function(state = [], action) {
  switch (action.type) {
    case types.FETCH_WEATHER:
      //return state.concat([action.payload.data]); // concat returns a new instance
      return [action.payload.data, ...state];
  }
  return state;
}

// make sure the reducer is being used
// ./reducers/index
import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather'; // import reducer

const rootReducer = combineReducers({  // add to combineReducers call
  weather: WeatherReducer // responsible for 'state.weather'
});

export default rootReducer;

// redux-promise middleware explaination - allows simple asynchronous code
// flow
// Click => ActionCreator => Action returned => Middleware => Reducer (new state)
// ActionCreator - index.js fetchWeather() fn makes AJAX request assigned to const
//  - the const 'request' is a promise returned from axios as the payload on ret obj
// Middleware - redux-promise  ???
// Reducer - weather reducer is returning the action from fetchWeather()
//  - the action is a response with request data, NOT the promise
//
// redux-promise Middleware - sees the incoming Action's payload property from AC
// - if the payload is a promise, redux-promise stops action
// - when request finishes, it dispatches a new action of same type but with a
//   payload of the resolved request with the request data
//    * ie 'unwraps' the promise
