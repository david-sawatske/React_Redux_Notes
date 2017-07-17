// Form empty? stop submission and show error below field

// Redux Form handles validation for us
// 1. write helper fn validate() that will be passed to 'reduxForm' helper as config option
//    - it will be called automatically during certain points of the form lifecycle
//      including when the user submits the form
//    - passed (values) arg, an obj containing all values user has entered into form
//    - we must create an obj for validate(values) fn to return
//      ex: const errors = {};     always start with an empty 'errors' object
//          logic to validate inputs from 'values' object
//          return errors object - if empty obj, there is nothing wrong


// Displaying errors
// - Redux Form: only responsible for managing state of form
// - we need to show mark up on the screen (in <Form> comps) and errors, as well

// - case: 'errors' object has a 'title' property, ReduxForm renders <Field>
//   and passes along the error message into 'this.renderField' if the <Field>
//   who's name matches the property of the errors obj.
//   * the connection is 'errors.title' (validate fn) and name="title" (<Field>)

// ./components/posts_new
class PostsNew extends Component {

  renderField(field) {                // (field) represents a single piece of state
    return (                          // with props, both defined and defaults
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input} // one of the above mentioned default properties
        />
        {field.meta.error} // '.meta.error' property is auto added to 'field'
      </div>               // object from validate function below
    );
  }

function validate(values) {
  const errors ={};

  if (!values.title) {                       // these 'if' statements will assign
    errors.title = 'Enter a title'           // properties (ie 'errors.title') to
  }                                          // 'errors' object
  if (!values.categorise) {
    errors.categorise = 'Enter a categorise'
  }
  if (!values.content) {
    errors.content = 'Enter some content'
  }

  return errors;       // returns errors if new props assigned
}

export default reduxForm({
  validate,            // === 'validate: validate'   will be called on submition
  form: 'PostsNewForm'
})(PostsNew);


// Form Submittal - handle submittal with ReduxForm whenever HTML form is submitted
// - define 'onSubmit={}' property on the form component, which is passed a fn
//   * the passed in function will be called whenever the '<form>' is submitted

// ReduxForm handles state, does not POST form data to server
// we need create logic that takes the submitted vals and have them do what we want
// 1. pull '{ handleSubmit }' property and pass to 'onSubmit={}'this.onSubmit.bind(this)
//    - we will define 'this.onSubmit' helper fn

//  onSubmit={handleSubmit(this.onSubmit.bind(this))}
//  - 'handleSubmit' ReduxForm side that handles validation side (submit or not)
//  - 'onSubmit' callback fn we define that recieves (values)
//     * 'this.bind' because it is a callback fn that will called in a context
//        outside of component in which it is defined ('this' still eq component)

// still in ./components/posts_new
class PostsNew extends Component {
// ...
  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        // ...
        <button type="submit" className="btn btn-primary">Submit</button> // new
      </form>
    );
  }
}
// ...
export default reduxForm({  // this reduxForm helper adds additional properties
  validate,                 // that are passed to '(PostsNew)'
  form: 'PostsNewForm'      // - including 'this.handleSubmit' above
})(PostsNew);
