// displaying post in the PostShow

// import 'connect' helper from r-r and new 'fetchPost' Action Creator
// hook up components with the 'connect' helper at the bottom
// - we do not have a 'mapStateToProps' fn, so first arg is 'null'
// - the second is the 'fetchPost' Action Creator

// want to call the 'fetchPost' Action Creator when PostsShow is rendered to DOM
// - use componentDidMount() lifestyle method and call A/C inside
//   * lifestyle methods must be spelled correctly

// the post should now be added to Post piece of Applicaiton level state

// take the post out of the App level state and get into component with
// 'mapStateToProps()' fn
// - state obj as argument (destructure as only 'post' needed)

// get ID from token in URL using prop provided from ReactRouter 'this.props.match.params.id'
// - 'match' is top level property, 'params' is obj lists wildcard tokens in URL
//   * we are not limited to one wildcard, ex could have .../:id/:commentId

// 'PostsShow' component is dependent on huge object that holds all posts
// while it only cares about one post
// - second arg 'ownProps' to 'mapStateToProps', which is props object that is
//   going to the 'PostsShow' component
//   * the single post is then stored posts[ownProps.match.params.id]

// pass 'mapStateToProps' to the 'connect()' fn

// take 'post' we are now recieving as a prop and show it in the 'render()' fn
// - we will refer to the post obj mul times, so destructure to a variable 'post'

// request, step by step after PostsShow component is rendered
// 1. 'componentDidMount()' lifestyle method reaches out to fetch specific post
// 2. post is selected from the post object 'mapStateToProps'
// 3. 'render()' the details to the screen
//    - need to add check to 'render()' method that will make sure not to try
//      to display a post that has not yet been rendered

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);  // calling Action Creator inside, providing
  }                            // specific post we want to fetch

  render() {
    const { post } = this.props;

    if (!post) {                    // this is a placeholder displayed while
      return <div>Loading...</div>  // the post is fetched
    }

    return (                        // once fetched, the component re-renders
      <div>                         // will hit this block of JSX to display
        <h3>{post.title}</h3>
        <h6>categories: {post.categories}</h6>
        <div>{post.content}</div>
      </div>
    )
  }
}
                                                     // destructure 'state'
function mapStateToProps({ posts }, ownProps) {      // to get 'posts' prop
  return { post: posts[ownProps.match.params.id] };  // returns single post
}                                                    // available with
                                                     // 'this.props.post'
export default connect(mapStateToProps, {fetchPost})(PostsShow);
