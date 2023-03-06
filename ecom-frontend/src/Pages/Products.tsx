import React, { useState, useEffect } from "react";
import { getProducts } from "../services/products";
var myHeaders = new Headers();
myHeaders.append("apikey", "r2x2WwsA1lOulrvE2yu5SVK3ao46A5Lq");

var requestOptions: object = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [convertionRate, setConvertionRate] = useState<number>(1);
  const [currency, setCurrency] = useState<string>("USD");
  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      setLoading(true);
      try {
        fetch(
          `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=usd&amount=10`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setConvertionRate(result.info.rate))
          .catch((error) => console.log("error", error));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCurrency();
  }, [convertionRate, currency]);

  useEffect(() => {
    const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      setCart(JSON.parse(cartFromStorage));
    }
  }, []);

  useEffect(() => {
    const event = new CustomEvent("cartUpdated", { detail: cart });
    window.dispatchEvent(event);
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log(cart);
    const button = document.getElementById(product.id.toString());
    button!.innerHTML = "Added to cart";
    button!.style.transition = "all 2s";
    setTimeout(() => {
      button!.innerHTML = "Add to cart";
      button!.style.backgroundColor = "black";
    }, 2000);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="product-main-container">
      <div className="currency-container">
        <button
          onClick={() => {
            setCurrency("USD");
          }}
        >
          USD
        </button>
        <button
          onClick={() => {
            setCurrency("NOK");
          }}
        >
          NOK
        </button>
        <button
          onClick={() => {
            setCurrency("EUR");
          }}
        >
          EUR
        </button>
      </div>
      <div className="product-grid-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-grid-item">
              <img className="img" src={product.imageUrl} alt={product.name} />
              <div className="product-grid-item-info">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h3>
                  {(() => {
                    switch (currency) {
                      case "USD":
                        return "$";
                      case "NOK":
                        return "kr";
                      case "EUR":
                        return "€";
                      default:
                        return "$";
                    }
                  })()}
                  {(product.price * convertionRate).toFixed(2)}
                </h3>
                <button
                  className="btn"
                  id={product.id.toString()}
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
