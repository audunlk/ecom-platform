import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";



//          history.push("/checkout", { orderId, total } );

export default function Checkout() {
    const location = useLocation();
    interface State {
        orderId: string;
    }
    const { orderId  } = location.state as State;
    console.log(orderId, )

    
        


  return (
    <div className="contact-container">
        <div className="contact-item">
            <h1>Checkout</h1>
            <h4>Your order has been
            placed successfully!
            </h4>
            <p>Thank you for shopping at Elixir!</p>
            <p>Order ID: {}</p>
            <Link to="/products"
            ><button className="loginbtn">Continue Shopping</button></Link>
        </div>
        
    </div>
  )
}
