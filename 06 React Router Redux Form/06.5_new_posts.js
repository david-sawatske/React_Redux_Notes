// Planning
// 1. Scaffold 'PostsNew' component
// 2. Add route config around component
//    - <Route path="/posts/new" component={PostsNew} />
// 3. Add nav between Index and PostsNew
// 4. Add PostsNew form
// 5. Make Action Creator to save post to backend API

// 1. Creating new, bare bones, component
// new file ./components/posts_new.js
import React, { Component } from 'react';

class PostsNew extends Component {
  render() {
    return (
      <div>
        Placeholder
      </div>
    );
  }
}

export default PostsNew;


// 2. Add route for new component
// ./index
// ...
import PostsNew from './components/posts_new'

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={PostsIndex} />
        <Route path="/posts/new" component={PostsNew} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));


// Fix render of root Component rendering on all routes (it's loose match)
//  - the React Router shows all components that meet generic criteria
//    ie "/posts/new" has "/", show 'PostsIndex' as well

// we need to add the 'Switch' Component
//  - takes collection of routes and returns the first matching child in list
//  - make sure to put the most specific routes at the top
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// ...
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} /> // more specific at
          <Route path="/" component={PostsIndex} />        // the top
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>


// 3. Add nav between Index and PostsNew (tell React Router to show diff Components)
//    Done by using Link Component provided from react-router-dom
//    - think of 'Link' as a classic <a> tag

// ./posts/posts_index
// ...
import { Link } from 'react-router-dom';
// ...
render() {
  return (
    <div>
      <div className="text-xs-right"> // will appear on top right of page
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post    // upon inspection in browser, it shows as an <a> tag?
        </Link>         // React Router prevents some event handlers that plain
      </div>            // <a> tags have as default behavior. ie the <Link> tag
      <h3>Posts</h3>    // from React Router blocks addition HTTP requests
      <ul className="list-group">
        {this.renderPosts()}
      </ul>
    </div>
  );
}
}
