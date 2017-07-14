// Reducer to produce Post piece of state - obj with key of IDs and val of post
// - reminder: API returns an array

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



// wire 'fetchPosts' Action Creator to the 'PostsIndex' component
// ./components/posts_index

import React, { Component } from 'react';
import { connect } from 'react-redux'; // r-r 'connect' helper
import { fetchPosts } from '../actions'; // fP Action Creator

class PostsIndex extends Component {
 render() {
   return (
     <div>
       Post Index
     </div>
   )
 };
}

// wiring up an 'FETCH_POSTS' Action Creator to the 'PostsIndex' component
// - to get A/C into a component (allows calling off 'props' obj)
// - previously, we defined a seperate 'mapDispatchToProps' fn
// Identical Shortcut:
// 1. define 'mapDispatchToProps' argument of 'null' (we are not passing that fn)
// 2. pass in the Action Creator itself, inside of an object '{ fetchPosts }'
//    - { fetchPosts: fetchPosts } === { fetchPosts }
export default connect(null, { fetchPosts })(PostsIndex);



// When are we going to fetch the list of posts by calling the fetchPosts A/C?
//  - whenever the PostsIndex component is about to be rendered

// React Lifecycle Method - a fn on a Component class that is auto called by React
// - 'componentDidMount()' is an example

// ./components/posts_index
import React, { Component } from 'react';
import { connect } from 'react-redux'; // r-r 'connect' helper
import { fetchPosts } from '../actions'; // fP Action Creator

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts(); // the 'fetchPosts' Action Creator connected below
  }
  // this Lifecycle Method will be auto-called by React immedeatly after the
  // PostsIndex Component shows up in the DOM
  //  - can be after because fetching data is an asynchronous operation

 render() {
   return (
     <div>
       Post Index
     </div>
   );
 }
}

export default connect(null, { fetchPosts })(PostsIndex);


// Rendering list - first add posts using Postman
// Hook component to Application level state and render list of posts
// - when we want something from App lev, always define 'mapStateToProps()' fn

// still  ./components/posts_index
// ...

 function mapStateToProps(state) {     // define map state to props
   return { posts: state.posts };
 }

// hook 'mapStateToProps()' as 1st argument to the 'connect()' fn
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);


// Creating helper fn 'renderPosts()' to render list
// still  ./components/posts_index
// ...
import _ from 'lodash';
// ...
  // helper that will map over posts ( an obj) and create an  <li> for each
  // using lodash map fn within the class
  renderPosts() {     // the 2nd arg is a fn where we render the JSX
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key="{post.id}"> // unique/ consistant key
          {post.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div> // changing render method to display posts
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}
