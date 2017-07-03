// Passing callback function to the search bar component
// => the callback will take a search term string and make a new YT search
// => when search is compete, it will reset the state of the video list

// 1. define the callback on App
// index.js
// ...
// define new method 'videoSearch' and move the YT search into it
//  => we still want to have the default search set inside constructor
constructor(props) {
  // ...
  this.videoSearch('default'); // setting default
}

videoSearch(term) {
  YTSearch({key: API_KEY, term: term}, (videos) => { // change to 'term: term'
    this.setState({                                  // so that what is searched
      videos: videos,                                // is passed to YT search
      selectedVideo: videos[0]
    });
  });
}

// we can now pass the 'videoSearch' mechanism to the SB in the render function
// create property onSearchTermChange and pass it a funtion with a term
// term will call videoSearch for that term
// ie when SearchBar calls 'onSear..' with a term, the term is sent to the videoSearch
//    fn that will run the YT search
render() {
  return (
    <div>
      <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
    </div>
  );
}

// search_bar.js
// move 'onChange' event handler to seperate method

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
          // when input is changed, onInputChange is called with new
          // value from the input
      </div>
    );
  }

  // here we want to 1. continue to set state with the term and also want to
  // 2. call the callback we got from App with the search term
  onInputChange(term) {
    this.setState({term});                // 1.
    this.props.onSearchTermChange(term);  // 2.
  }
