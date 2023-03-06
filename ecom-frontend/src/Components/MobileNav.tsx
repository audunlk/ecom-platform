import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { useState, useEffect } from 'react'


export default function MobileNav() {
    const [cartLength, setCartLength] = useState(0)

    useEffect(() => {
        const cartItems = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')!)
            : []
        setCartLength(cartItems.length)
    }, [])

    

  return (
    <div className="navigation-mobile">
    <div className="collapse" id="navbarToggleExternalContent">
    <div className="bg-light p-4">
    
    <div className="menu-items">
        <Link to="/">
                    <button className="navbtn">Home</button>
        </Link>

    <Link to ="/products">
                    <button className="navbtn">Shop</button>
                </Link>
                
                <Link to="/contact">
                    <button className="navbtn">Contact</button>
                </Link>
                <Link to="/cart">
                    <button className="navbtn"><HiOutlineShoppingBag />
                    {cartLength}
                    </button>
                </Link>
                <Link to="/login">
                    <button className="loginbtn">Login</button>
                </Link>
                </div>
    </div>
  </div>
  <nav className="navbar navbar-light bg-light">
    <div className="container-fluid">
        <div>
            <Link to="/">
                    <p>ELIXIR</p>
                </Link>
        </div>
      <div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      </div>
    </div>
  </nav>
  </div>
  )
}
