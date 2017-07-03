// Video list - Functional component as there is no need for state

// video_list.js
import React from 'react';

const VideoList = () => {
  return (
    <ul className="col-md-4 list-group"> // added class for BootStrap styling
    </ul>
  );
};

export default VideoList;


// in index.js, add to the render method
// ...
import VideoList from './components/video_list';

render() {
  return (
    <div>
      <SearchBar />
      <VideoList videos={this.state.videos} /> // adding access to videos from parent
    </div>
  );
}
// VideoList needs access to the list of videos from it's parent's state, App
//  => the data is called a prop
//  => when App rerenders, new prop is passed to child
// 1. we define a property on on the JSX tag '<VideoList ...'
//    - 'videos={this.state.videos}' is a reference to a JS variable, hence {}
//    - we are passing prop 'videos' from App (parent) to VideoList (child)
//


// video_list.js
// the props object from above will arrive as an argument to the funciton
import React from 'react';

const VideoList = (props) => { // adding the props as an argument
  return (
    <ul className="col-md-4 list-group">
      {props.videos.length} // just printing length of the videos array passed in
    </ul>
  );
};


// //
// we have a funcitonal video list component with array of vids as 'props.video'
// need to render one video list item per video by looping over 'props.video'

// video_list_item.js
// setting up the items
import React from 'react';

const VideoListItem = (props) => {
  return <li>Placeholer</li>
};

export default VideoListItem;


// video_list.js
//
import VideoListItem from './video_list_item' // import newly written

// mapping through the videos list and returning an array of VideoListItems
// stored in the const VideoList
//  => VideoListItem have 2 properties
//     1. key = unique etag identifier from API response from YT
//        - performance increase when updating records
//     2. video = the video
const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return <VideoListItem key={video.etag} video={video} />
  });

  return (
    <ul className="col-md-4 list-group">
      {videoItems} // adding ref to JS variable with the and array of the videos
    </ul>
  );
};
