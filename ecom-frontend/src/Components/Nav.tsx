import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi'

export default function Nav() {
  return (
<div className="navigation-menu">
            <Link to="/">
                <p>ELIXIR</p>
            </Link>
            <div className="menu-items">
                
                <Link to="/products/mens">
                    <button className="navbtn">Mens</button>
                </Link>
                <Link to="/products/womens">
                    <button className="navbtn">Womens</button>
                </Link>
                <Link to="/Contact">
                    <button className="navbtn">Contact</button>
                </Link>
                <Link to="/cart">
                    <button className="navbtn"><HiOutlineShoppingBag /></button>
                </Link>
                <Link to="/login">
                    <button className="loginbtn">Login</button>
                </Link>
                {/* <Login /> */}
            </div>
        </div>  
        )
}
