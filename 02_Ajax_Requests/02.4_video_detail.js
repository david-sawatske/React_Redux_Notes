// When creating a new component, ask 'Do we need to maintain state?'
// for video detail, no. so we use a simple functional component

// video_detail.js
import React from 'react';

const VideoDetail = ({video}) => {  // ES6 to get the video property off list item
  const videoId = video.id.videoId; // from YT API
  const url = `https://www.youtube.com/embed/${videoId}`
  // embedded YT urls have a template we use above, inserting unique ID
  //  => used below in the iframe

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe> // look! //
      </div>
      <div className="details">
        <div>{video.snippet.title }</div>       // 'video.' from video property
        <div>{video.snippet.description}</div>  // 'snippet.' from YT API
      </div
    </div>
  );
};

export default VideoDetail;



// //
// index.js
import VideoDetail from './components/video_detail';
// ...
render() {
  return (
    <div>
      <SearchBar />
      <VideoDetail video{this.state.videos[0]}/> // taking first video to check
      <VideoList videos={this.state.videos} />
    </div>
  );
}

// video_detail.js
// often parent objs can't fetch needed info before the child renders
// add check to make sure video has been provided before render is attempted
const VideoDetail = ({video}) => {
  if (!video) {                     // if a video is not yet available
    return <div>Loading...</div>    // 'Loading...' will be displayed
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
      </div>
      <div className="details">
        <div>{video.snippet.title }</div>
        <div>{video.snippet.description}</div>
      </div
    </div>
  );
};
