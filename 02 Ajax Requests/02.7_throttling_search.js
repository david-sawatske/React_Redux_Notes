// install lodash library
$ npm install --save lodash


// app.js
import _ from 'lodash';
// ...
render() {
  // passed a => function to 'debounce'
  //  => 'debounce' take that function and returns a new function that can only
  //     be called once every 300ms, as specified by second arg
  //  => we pass this new fn to onSearchTermChange to limit num of searches
  const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

  return (
    <div>

      <SearchBar onSearchTermChange={videoSearch}/> // _.debounce method passed in
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
    </div>
  );
}
}
