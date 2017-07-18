// we are currently showing error messages when Form is first rendered
// want to only show when user has selected away from the input

// 3 different states of the Form
// 1. pristine - as it first appears on the screen
// 2. touched - user has focused an input and focused out of the input
//    - this is when we want to display error, if needed
// 3. invalid - error display persists

// add ternary expression to the display of '{field.meta.error}'
// - using a meta property being tracked by ReduxForm, '.meta.touched'
//   * destructure meta property with     const { meta: { touched, error } } = field;
//     - we can remove 'field' and 'meta' from 'field.meta.touched'

// also add ternary expression for conditional styling

// ./components/posts_new
class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>     // use the const 'className' to give red
        <label>{field.label}</label>  // outline only if Field is touched
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help"> // will cause red text, always
          {touched ? error : ''}
        </div>
      </div>
    );
  }
// ...


// Navigation to back to all posts
// ./components/posts_new
import { Link } from 'react-router-dom'; // import

class PostsNew extends Component {
  // ...
  render() {
    // ...
        <button type="submit" className="btn btn-primary">Submit</button>

        <Link className="btn btn-danger" to="/"> // add Link
          Back to Posts Index
        </Link>
      </form>
    );
  }
}
