// We rely on the fetch of the list of posts to remove deleted post from App state
// All of the posts we have in local memory still includes the deleted post
// - we have to do a follow up req to fetch list without it

// Updating Local state whenever a post is deleted will make UI faster
// 1. import 'DELETE_POST'
// 2. add case statement for deletion
//    - the action's payload contains the id of the deleted post
//    - we need to erase the key and value in state associated with that id
//      * use 'omit' helper from lodash library
//        - if state object has key = action.payload (the id), omit it from
//          the new state object returned

// ./reducers/reducer_posts
import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
switch (action.type) {
  case DELETE_POST:
    return _.omit(state, action.payload);
  case FETCH_POST:
    return { ...state, [action.payload.data.id]: action.payload.data };
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}
