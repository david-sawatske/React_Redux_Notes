// Add Event Handler on the form element for Submit HTML form event
//  - this will prevent a post request to server/ rerendering the page
// ./containers/search_bar

//...
render() { // Per React nomenclature for handling DOM events, we pass a new
  return ( // fn handler 'onFormSubmit' to the propert 'onSubmit'
    <form onSubmit={this.onFormSubmit} className="input-group">
      <input // when 'onSubmit' runs, we want 'onFormSubmit' to run
        placeholder="Get a five-day forecast in your favorite cities"
        className="form-control"
        value={this.state.term}
        onChange={this.onInputChange}/>
      <span className="input-group-btn">
        <button type="submit" className="btn btn-secondary">Submit</button>
      </span>
    </form>
  );
}
// ...

// we have to define the onFormSubmit() fn
// ...

onFormSubmit(event) {     // we can use the event obj to tell browser
  event.preventDefault(); // don't submit the form
}

render() {
// ...
