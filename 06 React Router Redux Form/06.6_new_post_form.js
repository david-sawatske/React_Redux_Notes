// Using Redux Form library to validate form input data
// - use Redux Form documentation for install and form possibilities
$ npm install --save redux-form@6.6.3

// import Reducer from the Redux Form lib, hook it to the 'combineReducers' call
// - Redux Form uses our instance of the Redux store to handle all of the state
//   being changed by the form
// - saves us from having to wire a bunch Action Creators

// ./reducers/index
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // 'formReducer' is alias
import PostsReducer from './reducer_posts';          // for 'reducer'

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer // must wire into 'combineReducers' call using the key of 'form'
});                 // - forms w/ in our components will see 'formReducer' is
                    //   being applied to the 'form' piece of state
export default rootReducer;


// how to use Redux Form lib //
// Identify different pieces of form state
// - 1. Title 2. Categories 3. Contents
// make one 'Field' component per piece of state
// - created by Redux Form, we tell what type of input
// user changes a 'Field' input
// Redux Form automatically handles changes
// user submits form
// we pass 2 callbacks that vaildate inputs and handle form submission


// Making field components

// ./components/post_new
// import Field component and reduxForm fn from 'redux-form' library
// - reduxForm is very similar the 'connect' helper from react-redux
//   * allows our component to communicate with 'formReducer' we wired into state

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; // importing

class PostsNew extends Component {
// ...
}
// wire the reduxForm helper to wrap the 'PostsNew' component
// - allows Redux Form lib to communicate directly from the Form Component
//   (PostsNew) to the Reducer (PostsReducer)
// - pass in single argument as fn that takes configuration options
//   * only 'form' here which is name of form (must be unique) as it IDs the form
//   * if not unique the state for the two forms will be merged
export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);

// setting up form itself and wiring in the first field
// still working with HTML <form> element
// now with distinct <Field> components which are passed properties
// - 'name' - what piece of state is the user editing
// - 'component' -  takes in fn used to display the <Field> component

// the 'component' property info //
// the <Field> component can communicate with ReduxForm, but can't generate JSX
// - doesn't know how to display onto screen, only interacts with Redux Form
// - the 'component' prop adds in fn that will return JSX to show field on screen
//   * field is only concerned with data, component prop is outward facing side

// Make helper fn on 'PostsNew' class to render JSX and be passed to 'component'
// - the helper fn will have to wire JSX produced to the <Field> component
//   * helper will have arg '(field)', an obj that contains Event Handlers that
//     we need to wire to the JSX it returns to the <Field> component

// {...field.input} is an object that contains different Event Handlers and props
// - shortcut for onChange={field.input.onChange}, onFocus=..., onBlur

// ./components/post_new
// ...
class PostsNew extends Component {
  renderTitleField(field) {
    return (
      <div>
        <input>
          type="text"  // could be file picker etc
          {...field.input}
       // these are not needed
       // onChange={field.input.onChange}
       // onBlur={field.input.onBlur}
       // onFocus={field.input.onFocus}
       <input/>
      </div>
    );
  }

  render() {
    return (
      <form>
        <Field> // <Field   ... /> and no closing </Field> tag is needed
          name="title"
          component={this.renderTitleField} // note no () to call fn ourselves
        </Field>                            // <Field> will call fn in the future
      </form>
    );
  }
}
// ...
