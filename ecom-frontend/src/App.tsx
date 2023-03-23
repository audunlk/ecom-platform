import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useIsOnMobile from './Hooks/useIsOnMobile';

import Home from './Pages/Home';
import Products from './Pages/Products';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Nav from './Components/Nav';
import Checkout from './Pages/Checkout';
import MobileNav from './Components/MobileNav';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {
  const onMobile = useIsOnMobile();

  return(
    <div id="app">
      <Router>
      {onMobile ? <MobileNav /> : <Nav />}
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/contact" component={Contact} /> 
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
