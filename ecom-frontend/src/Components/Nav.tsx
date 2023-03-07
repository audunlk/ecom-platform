import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

export default function Nav() {
    const [cartSize, setCartSize] = useState(0)
    const [loggedIn , setLoggedIn] = useState(false)
    const history = useHistory()
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        const cartItems = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')!)
            : []
        setCartSize(cartItems.length)
        window.addEventListener('cartUpdated', (e: any) => {
            setCartSize(e.detail.length)
        })
    }, [history,
        loggedIn
    ])

    const checkToken = () => {
        if(loggedIn) {
            return true
        } else {
            return false
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        history.push('/')
    }











    

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
                    {checkToken() ? <button className="loginbtn"
                    onClick={logout}
                    >Logout</button> : 
                    <button className="loginbtn"
                    >Login</button>}
                </Link>
                {/* <Login /> */}
            </div>
        </div>  
        )
}
