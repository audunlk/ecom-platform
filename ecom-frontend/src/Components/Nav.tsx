import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi'

export default function Nav() {
    const [cartSize, setCartSize] = useState(0)
    
    useEffect(() => {
        const cartItems = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')!)
            : []
        setCartSize(cartItems.length)
        window.addEventListener('cartUpdated', (e: any) => {
            setCartSize(e.detail.length)
        })
    }, [])









    

  return (
<div className="navigation-menu">
            <Link to="/">
                <p>ELIXIR</p>
            </Link>
            <div className="menu-items">
                <Link to ="/products">
                    <button className="navbtn">Shop</button>
                </Link>
                
                <Link to="/contact">
                    <button className="navbtn">Contact</button>
                </Link>
                <Link to="/cart">
                    <button className="navbtn"><HiOutlineShoppingBag />
                    {cartSize} 
                    </button>
                </Link>
                <Link to="/login">
                    <button className="loginbtn">Login</button>
                </Link>
                {/* <Login /> */}
            </div>
        </div>  
        )
}
