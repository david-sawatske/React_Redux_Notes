// button to navigate to index and to delete post
// deleting posts
// - 'onClick' event handler that calls 'onDeleteClick'
// - we create 'onDeleteClick()' that calls Action Creator we will create
//   * A/C to make the AJAX DELETE API request 'deletePost(id)'
//   * pass callback fn to route user after successful delete
// - import the 'deletePost' A/C and wire to connect helper at bottom of file

// ./components/posts_show
// ...
import { fetchPost, deletePost } from '../actions'; // add A/C
import { Link } from 'react-router-dom';
//...
onDeleteClick(){
  const { id } = this.props.match.params;
  this.props.deletePost(id, ()=> {   // callback to redirect user after delete
    this.props.history.push('/');    // using 'progromati navigation'
  })
}
// ...
  render() {
// ...
    return (
      <div>
        <Link className="btn btn-primary" to='/'>
          Back to Posts Index
        </Link>
        <button className='btn btn-danger pull-xs-right'
            onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <div>{post.content}</div>
      </div>
    );
  }
// ...
export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);

// creating the Action Creator 'deletePost(id)'
// make the axios delete request and nav user back to index
//  - recieve callback as 2nd argument so when the DELETE request is successful,
//    the user is directed to the index

// ./actions/index
// ...
export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}


// using <Link> tag making post index items clickable
// - need to give link specific posts id

// ./components/posts_index
// ...
  renderPosts() {
    return _.map(this.props.posts, posts => {
      return (
        <li className="list-group-item" key={posts.id}>
          <Link to={`/posts/${post.id}`}>
            {posts.title}
          </Link>
        </li>
      );
    });
  }
