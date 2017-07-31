// ReactFire - official binding between Firebase and React
// - used to directly inject data into components
// - at odds with Redux as it avocates single store for all App data

// good data flow - Redux should be source of truth in the application
// React <=> Redux <=> Firebase
// - using Firebase to inject data into the Redux store

// how do we get data from Firebase into the Redux application?

// Firebase Ref - direct reference to our data sitting in db online
// - can emit a series of 'value' events stating Firebase has recieved new data

// Firebase Ref is placed into an Action Creator
// - when FB Ref emits a 'value' event (new data), we turn it into an 'action'
// - dispatch 'action' to all Reducers
// - Reducers produce new Application state
// - React app renders and displays data to the user

//               -- action ---->
// Firebase Ref  --- action --->  Reducers ----> State
//               -----action -->

// sample_app/src/actions/index
// install NPM Firebase module and import

// create Firebase reference pointing to URL for app on firebase.com
// - we will listen to the FB 'Posts' for a 'value' event to get 'snapshot'
//   * 'snapshot' - see into Firebase data store to see what records have loaded

// write 'fetchPosts()' A/C to return a fn
// - when we get a 'value' event from FB, we take the 'snapshot' provided and
//   dispatch an Action with 'type: FETCH_POSTS, payload: snapshot.val()'
//   * 'snapshot.val()' is JSON representation of data just loaded by FB


// App boots up and calls 'fetchPosts()' one time
// 'fetchPosts()' returns the 'dispatch' fn
// which Redux Thunk invokes and passes in the 'dispatch' method
// when we get a 'value' event from the 'Posts' ref from Firebase
// and instantly 'dispatch' new action with 'type: FETCH_POSTS, payload: snapshot.val()'

// How to delete a post with Redux Thunk fn
// when 'deletePost' Action Creator is called, a 'key' (ID) is passed in
// return Redux Thunk fn 'dispatch' that finds the specific post by id
// and removes it
// - 'Posts.child(key).remove();' is a Firebase reference
// when post is removed, automatically get a 'Posts.on('value'...' value event
// - the value event includes the new list of posts

// How to add a post with Redux Thunk fn
// like above, but using 'push'  'return dispatch => Posts.push(post);'
// '.push' in FB pushes new data into database, not into an array
// the 'value' is triggered by the FB reference, that calls 'dispatch' method
// 'dispatch' method passes new action with new list of posts into Redux Reducers

import Firebase from 'firebase'; // import Firebase
import _ from 'lodash';
import {
  FETCH_POSTS,
  DELETE_POST,
  CREATE_POST
} from './types';

const Posts = new Firebase('https://fbredux.firebaseio.com/'); // create FB ref

export function fetchPosts() {
  return dispatch => {
    Posts.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val() // JSON rep of data that was just loaded by FB
      });
    });
  };
}

export function createPost(post) {
  return dispatch => Posts.push(post); 
}

export function deletePost(key) {
  return dispatch => Posts.child(key).remove(); // 'Posts.child(key)' FB reference
}
