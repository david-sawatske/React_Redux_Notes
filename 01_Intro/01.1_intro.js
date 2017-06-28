import React from 'react'; // this library allows working w/ React components
                           // assign whats in file 'react' to var 'React'
import ReactDOM from 'react-dom' // this lib allows rendering to the DOM

// React - JS library that is used to produce HTML, shown to user in web browser
//  => we write components or views - JS functions that produce HTML

// 1. create new Component - a collection of JS functions that produce HTML
const App = () => {
  return <div>Hi!</div>;  // JSX - JS dialect that allows us to include 'HTML'
}                         //     - can't be interpreted by the browser

// JSX gets turned to HTML by the webpack and bable in the sample app
//   - JSX -> vanilla JS -> HTML -> rendered to user
//   - JSX much cleaner than the vanilla JS


// 2. insert HTML in DOM
// React.render(App); // => error need to include ReactDOM library in file

// ReactDOM.render(App); // => error invaild component element
                         //    App fn creates instances, but is not one itself
                         //    need to pass instance of App, not App class
                         //    need to instantiate components before rendering
                         //    them to the DOM

// put JSX tag around class name (<App /> === <App></App>) self closing tag
// ReactDOM.render(<App />); // => error target container is not DOM element

// this creates an instance of App, but we need to specify DOM el on page
// need to tell where in the DOM the created HTML should be rendered
// pass 2nd argument to specify element (node) that already exists in HTML doc
//  - here finding div with class 'container'
ReactDOM.render(<App />, document.querySelector('.container'));
