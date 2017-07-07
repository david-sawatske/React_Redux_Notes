// open weather map API
// what it returns
{
  - city: {
    id: 413424
    name: "London",
  - coord: {
    long: -84.0832;
    lat: -84.0832
  }
  -list: [
    // an array of objs, including weather data 3 hrs at a time for 5 days
  ]
}

// save API key to ./actions/index as a string represented by a const
const API_KEY = 'ff16622aca1226a8209e8837e8690b86';


// Middleware - fn that take an action an performs a task before the Reducer
//  => may let through directly, manipulate, or block
// flow
// Click => ActionCreator => Action returned => Middleware => Reducer (new state)

// redux-promise - npm middleware package that helps handle AJAX requests
$ ReduxWeatherApp (search-bar) $

// hook redux-promise into the App
// ./src/index
// ...
import ReduxPromise from 'redux-promise'
// ...
const createStoreWithMiddleware = applyMiddleware(ReduxPromise )(createStore);
// ...
