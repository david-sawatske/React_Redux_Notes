// Reducer to produce Post piece of state - obj with key of IDs and val of post
// - reminder API returns an array

// ./reducers/index
// importing the Reducer we will create shortly

import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts'; // here

const rootReducer = combineReducers({
  posts: PostsReducer // assign that reducer to the posts piece of state
});

export default rootReducer;


// Creating the Reducer - APIs array of posts to object containing posts
// - lodash library has method that will perform this operation
    _.mapKeys(array, prop)
//    array - what we want to change to obj
//    prop - property we want to pull out for use as the keys ('id' in this case)


// new file ./reducer_posts
import _ from 'lowdash';
import { FETCH_POSTS } from '../actions/index'; // import type from the actions file

export default function(state = {}, action) { // default state as an object
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id'); // 'payload' from ./actions/index
    default:
      return state;
  }
}
