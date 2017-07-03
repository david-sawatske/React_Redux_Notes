// Adding concept of selected video to app component state
// => will be video object and passed into video detail
// => to update, pass in a callback from App into VideoList to VideoListItem
//    - the callback will be run whenever the video is clicked

// 1. adding concept of selected video
// index.js
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null // added 'sele..' initializer to state
    };

    // in search callback, the constructor, we add setting of initial video
    YTSearch({key: API_KEY, term: 'testing'}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0] // selectedVid will be the first of the videos arr
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoDetail video={this.state.selectedVideo]} /> // passing in 'sele..'
        <VideoList videos={this.state.videos} />
      </div>
    );
  }

  // 2. implementing callback - function passed from App to VideoList to VidLiItem
  // app.js
  class App extends Component {
    // ...
    render() {
      return (
        <div>
          <SearchBar />
          <VideoDetail video={this.state.selectedVideo]} />
          // pass another function to VideoList
          //  - takes a vid and updates App's state with that video
          //  ie id onVideoSelect is called, selectedVideo will update on state
          <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
        </div>
      );
    }

    // video_list.js
    // VideoList now has a property called props.onVideoSelect

    const VideoList = (props) => {
      const videoItems = props.videos.map((video) => {
        return (
          <VideoListItem
          // pass the callback from App in props to VideoListItem
            onVideoSelect={props.onVideoSelect}
            key={video.etag}
            video={video} />
        );
      });

      // video_list_item.js
      // now the prop is avialable to the list item
      // - pull the new property off prop obj inside {..., onVideoSelect}
      const VideoListItem = ({video, onVideoSelect}) => {
        const imageUrl = video.snippet.thumbnails.default.url;

        // we now have the callback we can use it
        // onClick event on the <li>, the onVideoSelect fn is run
        return (
          <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
              <div className="media-left">
                <img className="media-object" src={imageUrl} />
              </div>

              <div className="media-body">
                <div className="media-heading">{video.snippet.title}</div>
              </div>
            </div>
          </li>
        );
      };
