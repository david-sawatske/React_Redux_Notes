import React from 'react';

// const VideoListItem = (props) => { // props oject that contains key and video
//   const video = props.video;  // gets the video from list 'props' object
// ES6 syntax - same functionality as above
const VideoListItem = ({video}) => { // says VLI first arg has a property 'video'
                                     // grabs video prop and assigns to video

  const imageUrl = video.thumbnails.default.url; // thumbnail from YT API
  return (
    <li className="list-group-item">             // adding BS styling
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" />
        </div>

        <div className="media-body">
          <div className="media-heading">{video.snippet.title}</div> // from YT API
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
