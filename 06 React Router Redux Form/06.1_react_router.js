// How blogs will be saved to remote API

// React/ Redux app opens and makes an AJAX request to blog post API

// Redux Blog Post API Reference http://reduxblog.herokuapp.com/
// 4 routes that we can make requests to

// 1. /api/posts	GET  Fetches the 40 most recent posts in the database.
// 2. /api/posts	POST Creates a new blog post entry. Returns the created blog post with the ID
// 3. /api/posts/:id	GET Fetches a single blog post with the given ID.
// 4. /api/posts/:id	DELETE Deletes a single blog post with the given ID.


// Installing React Router - manage connection between URL and App behavior
// note - post list, post and create will have different UIs
// => we want to show a diff set of React components based on the URL

$ npm install --save react-router-dom@4.0.0


// How React Router works - intercepts changes to the URL and displays based on URL

// URL changes => History package => React Router => React => content to browser
// History figures out what changed about URL and passes it to React Router libr
// R/R updates React components based on the changed URL and sends to React
//  - we set up config as to how to change the React components
// React renders the new components on to the screen as content

// this is how SPAs (single page applicaitons) work
// - singe HTML doc and using JS to change the components on that page
// - no longer nav between distinct HTML docs created by some remote server


// Creating 2 new routes that display different content
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// importing from React router
import { BrowserRouter, Route } from 'react-router-dom';
// B/R obj interacts with History library and decides action based on URL change
// Route is a React component we can render in any other React component
// provides configuration to React Router - if URL is this, show this component

import App from './components/app';
import reducers from './reducers';

// create 2 temp class Components
class Hello extends React.Component {
  render() { return <div>Hello!</div>}
}

class Bye extends React.Component {
  render() { return <div>Bye!</div>}
}
const createStoreWithMiddleware = applyMiddleware()(createStore);

// wire the 2 components we created and the imported objects
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter> // <BR> can only have one child el, so wrap in one <div>
      <div>
        // creating the configuration by mapping 2 instances of the Route component
        // to the 2 test components we created
        //  - Route component requires 2 properties 'path' and 'component'
        //    * 'path' says if user goes to this route, show this 'component'
        <Route path="/hello" component{Hello}/>
        <Route path="/bye" component{Bye}/>
        // mix in anything that needs to be displayed along with the Route components
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
