// Note
import { BrowserRouter, Route } from 'react-router-dom';
// ...
<BrowserRouter>
  <div>
    <Route path="/bye" component{Bye}/>
  </div>
</BrowserRouter>
// the 'Route' component provide configuration by tying a we create component,
// {Bye}, to a particular route, path="/bye"
// - these names to not have to match


// Routes this app will need

// root route '/' - shows list of all blog posts
// - posts may be held in 'PostsIndex' component
//   ex: <Route path="/" component={PostsIndex} />

// specific post '/posts/5'
// - :id is a numeric wild card
//   ex: <Route path="/posts/:id" component={PostsShow} />

// post creation '/posts/new'
//   ex: <Route path="/posts/new" component={PostsNew} />


// Implementing root route

// create 'PostsIndex' component with boiler plate
// - new file components/posts_index.js
import React { Compnent } from 'react';

 class PostsIndex extends Component {
   render() {
     return (
       <div>
         Post Index
       </div>
     )
   };
 }

 export default PostsIndex;

// import 'PostsIndex' component to index.js
// ...
 import { BrowserRouter, Route } from 'react-router-dom';

 import reducers from './reducers';
 import PostsIndex from './components/posts_index'; // importing component

 const createStoreWithMiddleware = applyMiddleware()(createStore);

 ReactDOM.render(
   <Provider store={createStoreWithMiddleware(reducers)}>
     <BrowserRouter>
       <div>
         <Route path="/" component={PostsIndex} />  // there is an error here
       </div>                                       // that will be addressed
     </BrowserRouter>                               // when aparent
   </Provider>
   , document.querySelector('.container'));
