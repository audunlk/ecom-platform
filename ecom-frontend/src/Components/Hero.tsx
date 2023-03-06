import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h1>ELIXIR</h1>
        <p>Shop for the latest fashion trends</p>
        <Link to="/products">
          <button className="btn">Shop Now</button>
        </Link>
      </div>
      <div className="hero-right">
        <img src="http://localhost:3000/images/hero.jpg" alt="hero" />
      </div>
    </div>
  );
}
