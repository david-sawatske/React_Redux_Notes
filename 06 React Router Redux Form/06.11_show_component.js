// Fetching posts with specific ID

// set up boilerplate for new Component
// new file ./components/posts_show.js
import React, { Component } from 'react';

class PostsShow extends Component {
  render() {
    return (
      <div>
        posts show
      </div>
    );
  };
}

export default PostsShow;


// import in to index.js and make route for PostsShow with :id
// - ':id' is wildcard that R/R takes from URL to the PostsShow component as prop

// ./index
import PostsShow from './components/posts_show';
// ...
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} /> // more specific
          <Route path="/" component={PostsIndex} />         // than index
        </Switch>
// ...


// when user goes to specific post, we only fetch that post
// the 'PostsShow' component should be responsible for fetching its own data
// - users could go directly to that URL, not from index

// building Action Creator to fetch a specific post
// fetchPost(id) takes an arg of the post ID
// create a request variable that returns the return of axios GET request
// return Action from the Action Creator and create type

// ./actions/index
export const FETCH_POST = 'fetch_post';  // create type FETCH_POST
// ...
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}


// in Reducer, add in case to catch the new type and add it to App level state
// add 'FETCH_POST' to import statement
// add additional case that will return an object (post piece of state is an obj)
// - we may already have a certain number of posts that have been fetched and
//   stored inside  the Reducer that we don't want to dispose of it (want to add)
//     '{ ...state', post ID, actual post)
//   * '{ ...state' says take everything in the state obj and put it the new obj
//   * 'post ID,'      = [action.payload.data.id]
//     - '[]'  is key interoplation set 'action.payload.data.id' as key and
//   * 'actual post)'  =  action.payload.data
//     - 'action.payload.data'   as the value

// const post = action.payload.data;   from axios is the data we care about

// ./reducers/reducer_post
import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      // es5 way
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      // es6
      return {...state, [action.payload.data.id] : action.payload.data};

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
    return state;
  }
}
