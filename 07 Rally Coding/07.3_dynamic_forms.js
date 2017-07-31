// refactoring form with 'lodash' lib

// 'fields' definition that generates field helpers with in Redux Form
//  1. pull to top level constant 'const FIELDS = { ... }'
//     - each field as an object itself with configuration
//     - pass fields to export statement 'fields: _.keys(FIELDS),'
//       * must be an array of strings, string is name of field in component
//       * lodash helper fn '.keys()' gives that

//  2. using 'FIELDS' configuration obj to refactor 'validate(values)'
//     - iterate over 'FIELDS' and add to errors obj is 'field' has no value

//  3. create helper method 'renderField'
//     - takes 'fieldConfig' obj '{ field: ... type ... }' and name of field
//     - return rendered field, div with label, field controll, div to show
//       validation messaged
//     1. pull off 'fieldHelper()' from reduxForm
//     2. change '<label>' to get val from obj '{fieldConfig.label}'
//     3. return the 'type' of field from the 'fieldConfig' obj '{fieldConfig.type}'
//     4. in 'render()', map over FIELDS obj
//        - bind 'this' as we are making reference to props inside of the helper  

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

const FIELDS = {
  title: {
    type: 'input',           // the HTML element that will be displayed
    label: 'Title for Post'  // label that will appear on form
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
};

class PostsNew extends Component {
  onSubmit(props) {
    alert('Post Submitted');
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }`} >
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))} >
        <h3>Create A New Post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
                                          // 'type' is the configuration obj
  _.each(FIELDS, (type, field) => {       // 'field' field name itself
    if (!values[field]) {
      errors[field] = `Enter a ${field}`; // if there is no field, add to the
    }                                     // errors object
  });

  return errors;
}

export default reduxForm({
  form: 'PostsNew',
  fields: _.keys(FIELDS),
  // fields: ['title', 'categories', 'content'],
  validate
})(PostsNew);
