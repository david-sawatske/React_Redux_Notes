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

class PostsNew extends Component {
// ...
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
