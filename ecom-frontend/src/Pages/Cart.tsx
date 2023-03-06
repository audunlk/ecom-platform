import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  console.log(cart);
  useEffect(() => {
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : [];
    setCart(cartItems);
  }, []);

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
        <div></div>
      </div>

      <div className="cart-grid-list">
        {cart.map((item) => {
          return (
            <div key={item.id} className="cart-grid-item">
              <h2>{item.name}</h2>
              <p>${item.price}</p>

              <p>{item.description}</p>
              <div>
                <img src={item.imageUrl} alt={item.title} />
              </div>
            </div>
          );
        })}
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
        {cart
          .reduce((acc, item) => {
            return acc + +item.price;
          }, 0)
          .toFixed(2)}
      </div>
    </div>
  );
}
