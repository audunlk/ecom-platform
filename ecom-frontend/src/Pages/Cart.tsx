import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sendOrder } from "../services/products";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getCarWithoutDuplicates, getCartSum } from "../utils/cart";



export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory()


  console.log(cart);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        setLoggedIn(true);
        try{
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken)
        } catch (error) {
            console.log(error)
        }
    } else {
        setLoggedIn(false);
        history.replace("/register")
    }
    console.log(loggedIn)
    console.log("logged in")
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : [];
    setCart(cartItems);
  }, [history, loggedIn,]);

  const cartWithoutDuplicates = getCarWithoutDuplicates(cart);
  const cartSum = getCartSum(cart);
  

    


    
  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id || null;
        const items = cartWithoutDuplicates;
        const response = await sendOrder(userId, items);
        const orderId: number = response.id;
        
        localStorage.removeItem("cart");
        history.push(`/checkout/`, { orderId: orderId, total: cartSum });
        } catch (error) {
        console.log(error);
        }
    } else {
        history.push("/register")
    }

  };

  return (
    <div className="cart-main-container">
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "black",
          padding: "2rem",
        }}
      >
        Your Order:
      </div>
      <div
        className="cart-item-details"
        style={{
            width: "60%",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        Name
        <div>Price</div>
        <div>Description</div>
        <div>Quantity</div>
        <div></div>
      </div>

      <div className="cart-grid-list">
        {cart.length === 0 ? 
        <div>Your cart is empty</div> :
        cartWithoutDuplicates.map((item: any) => {
          return (
            <div key={item.id} className="cart-grid-item" 
            
             >
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <p>{item.description}</p>
              <p>{item.quantity}</p>
              <div>
                <img src={item.imageUrl} alt={item.title} />
              </div>
            </div>
          );
        })}
    {cart.length === 0 ?
    null:
    <Link to="/checkout">
    <button className="checkoutbtn"
        onClick={handleOrder}
    >
        Checkout
      </button></Link> }
      </div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "black",
          padding: "3rem",
          width: "60%",
          textAlign: "end",
        }}
      >
        Total: $
        {cart.length === 0 ?
        null:
        cartSum}
            
      </div>
      
    </div>
  );
}
