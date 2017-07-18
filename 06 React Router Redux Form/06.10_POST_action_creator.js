// 'onSubmit' handles submittial event and is called with obj '(values)'
// - 'values' contains the post's Title, Categories and Content
// - we need to take the values object and POST it to the API
//   * saving data or making API requests inside of Redux app, use Action Creator

// Creating the Action Creator
// 1. create a createPost(values) fn that takes argument of the values obj
// 2. makes a POST request to API with axios
//    - provide URL as first arg and the second is the data to POST
// 3. return an Action which contains the 'request' as the payload

// ./actions/index
// ...
export const CREATE_POST = 'create_post'; // creating the type 'CREATE_POST'
// ...
export function createPost(values) { // 'values' mentioned above
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values); // POST req

  return {
    type: CREATE_POST,
    payload: request
  };
}

// at this point, we can't put the 'values' obj directly into state array
// - it does not have an ID associated with it (state obj keys are posts ID)

// import 'connect' helper fn from react-redux and
// call the Action Creator created above in the 'posts_new' file
// hookup 'connect' helper at bottom of file
// - need to 'layer' along with the 'reduxForm' helper by putting the result
//   'connect' helper as the 2nd set of parenthesis
// call the Action Creator in the 'onSubmit' fn

// ./components/post_new
import { connect } from 'react-redux';
import { createPost } from '../actions';
// ...
onSubmit(values) {
  this.props.createPost(values); // calling the AC
}
// ...
export default reduxForm({
  validate: validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostNew) // this line returns React component,
);                                       // so it's input to 'reduxForm' helper


// TESTING IN BROWSER
// 2 requests show up
// 1st - has 'Request Method:OPTIONS' is used when submitting CORES
// - used when making cross origin resource sharing requests
//   * from localhost:8080 to a different domain (the blog API)
// - browser security feature that prevents malicious requests to other domains
// 2nd - has Request Method:POST    Status Code:201 Created
// preview tab shows post object with ID


// Navigation after form submission
// user submits => validate form => call 'onSubmit' => Call A/C to make API req =>
// => wait => nav to index after success

// <Link> will not work as it generates an <a> tag that renders in the DOM
// we want to automatically redirect the user (progromatic navigation)

// React Router handles prog nav by passing a set of props to component that
// is being rendered by a route

// when R/R Route component renders a component '{PostsNew}', it passes in helpers
// and objects that help with navigation to the component '{PostsNew}'
// ./index
<Route path="/posts/new" component={PostsNew} />
// because the Route is rendering '{PostsNew}', '{PostsNew}' component is
// given a bunch of props to help with navigation, including 'this.props.history.push()'
// - 'push('route');'  when 'push' is given a route, user is auto naved to that route
//   * we only want to perform this navigation after the post is created

// we pass a callback fn to the '.createPost()' Action Creator and put the
// this.props.history.push('/') inside
// - if the A/C calls the fn, the user will be navigated to the posts index

// .components/posts_new
// ...
onSubmit(values) {
  this.props.createPost(values, () => {
    this.props.history.push('/');
  });
}
// ...

// 'createPost()' should recieve the callback fn and have it be called after
// the axios POST request is successful using a promise
// Promise object is used for handling asynchronous computations which has some
// important guarantees that are difficult to handle with the callback method 

// ./actions/index
// ...
export function createPost(values, callback) { // passing in the promise
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback()); // calling the callback with the promise

  return {
    type: CREATE_POST,
    payload: request
  };
}
