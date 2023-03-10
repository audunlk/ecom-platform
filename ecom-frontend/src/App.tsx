import React, {useState, useEffect} from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//navigator

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
  const [onMobile, setOnMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOnMobile(true);
      } else {
        setOnMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);



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
