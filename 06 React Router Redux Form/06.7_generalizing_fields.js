// Field styling - job of the 'renderTitleField' function
// DRY code by making general 'renderField' fn
// - each '<Field' component uses different state
// - have specific label for each by passing in properties to 'Field' component
//   * those props will be passed into the 'field' arg to fn 'renderField(field)'


// ./components/posts_new
// ...
class PostsNew extends Component {
  renderField(field) {                // (field) represents a single piece of state
    return (
      <div className="form-group">    // bootstrap styling
        <label>{field.label}</label>  // title taken from prop on 'field' arg
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    );
  }
// adding other Fields
  render() {
    return (
      <form>
        <Field
          label="Title"                 // passing properties into the Field
          name="title"                  // component, they are automatically
          component={this.renderField}  // attached to 'field' arg for renderField
        />
        <Field                          // new properties
          label="Tags"
          name="tags"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);
