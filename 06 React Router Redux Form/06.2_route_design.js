// Note
import { BrowserRouter, Route } from 'react-router-dom';
// ...
<BrowserRouter>
  <div>
    <Route path="/bye" component{Bye}/>
  </div>
</BrowserRouter>
// the 'Route' component provide configuration by tying a component ({Bye})
// to a particular route (path="/bye")
