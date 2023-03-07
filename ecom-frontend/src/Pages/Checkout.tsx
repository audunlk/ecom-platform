import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";



//          history.push("/checkout", { orderId, total } );

export default function Checkout() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const [orderId, setOrderId] = useState(0);
    const [total, setTotal] = useState(0);

    interface ILocationState {
        orderId: number;
        total: number;
    }

    useEffect(() => {
        const awaitOrderInfo = async () => {
            const { orderId, total } = location.state as ILocationState;
            setOrderId(orderId);
            setTotal(total);
            setLoading(false);
        };
        awaitOrderInfo();
    }, [ location.state]);





  return (
    <div className="contact-container">
        <div className="contact-item">
            <h1>Checkout</h1>
            <h4>Your order has been
            placed successfully!
            </h4>
            <p>Thank you for shopping at Elixir!</p>
            {loading && <p>Loading...</p>}
            <p>Order ID: {orderId}</p>
            <p>Total: ${total}</p>
            <Link to="/products"
            ><button className="loginbtn">Continue Shopping</button></Link>
        </div>
        
    </div>
  )
}
