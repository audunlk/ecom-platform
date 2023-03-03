import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Components/Nav';
//navigator

import Home from './Pages/Home';
import Products from './Pages/Products';

function App() {
  return(
    <div id="app">
      <Router>
      <Nav />
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          {/* <Route exact path="/shop" component={Shop} />
          <Route exact path="/contact" component={Contact} /> */}
        </Switch>
      </Router>
    </div>

  )
}

export default App;
