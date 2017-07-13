// PostsIndex Redux Build

// GET request for posts will return and array with post objects w- unique ids

// the URL is an important piece of state, especially the post ID
// - therefore we do not need defined 'activePost' piece of state

// Storing list of posts as an Object using the ID for the key, val is post itself
// - improves the lookup speed vs array lookup
{
  4: {title: 'hello', id:4, content: 'Hi', tags: 'greetings'},
  12: {title: 'goodbye', id:12, content: 'Bye', tags: 'greetings'},
}

// 1st Action Creator - fetches list of posts and serves them to PostsIndex component
// ./actions/index.js

export const FETCH_POSTS = 'fetch_posts'; // exporting the action object

export function fetchPosts() {
  return {              // Action Creator returns a action object that must have
    type: FETCH_POSTS   // a type
  };
}

// the 'fetchPosts()' action creator (fetches posts returns them to Reducer)
// needs to reach out to the API with a network request
// - network requests inside action creators with axios and redux-promise
//    * axios - makes actual request
//    * redux-promise - handles asynchronous nature of the request

$ npm install --save redux-promise

// wire up redux-promise as the middleware in the application
// ./index.js
// ...
import promise from 'redux-promise'; // import promise
                                     // pass to 'applyMiddleware(promise)'
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// ./actions/index.js
// in Action Creator, make request using axios library. assign the return from
// the request to the payload property of the action we are returning
// - because the request is assigned to 'payload' property, the redux-promise
//   middleware will automatically resolve the request when the Action comes across
import axois from 'axios'; // import axios

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = 'http://reduxblog.herokuapp/api'; // all of the ACs will use as base
const API_KEY = '?key=fud123'; // unique key needed as specified by API for posts

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  // generating GET request using axios to specific URL that handles that request
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

// the 'payload' will contain the response object (array) recieved from the API
// when the Action created above arrives at the Reducer
