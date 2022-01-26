import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Button from "./lib/Button";
import { Input } from "./lib/Input";
import { useNotification } from "./lib/useNotification";

function App() {
  let [products, setProducts] = useState([]);
  let [productsInCart, setProductsInCart] = useState([]);
  let [currentColor, setCurrentColor] = useState(null);
  let [priceRange, setPriceRange] = useState({
    minimumPrice: 0,
    maximumPrice: 0,
  });
  let [showSuccess, successNotif] = useNotification(
    "Your purchase was successful!",
    "success"
  );
  let [showFailure, failureNotif] = useNotification(
    "Your purchase failed :(!",
    "error"
  );
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.result);
      });
  }, []);
  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    let paymentStatus = searchParams.get("payment");
    if (paymentStatus === "success") {
      showSuccess();
    } else {
      showFailure();
    }
  }, []);
  return (
    <div className="App">
      {successNotif}
      {failureNotif}
      <header className="App-header">
        <h1>My Sofa Shop</h1>
        <div className="container">
          <section className="filters">
            <div>
              <p style={{ fontSize: "14px", paddingBottom: "10px" }}>
                Select color
              </p>
              <ul className="palette">
                {["black", "red", "green", "blue", "yellow"].map((color) => (
                  <li
                    key={color}
                    onClick={(event) => {
                      setCurrentColor(color);
                    }}
                    style={{ "--color-fill": color }}
                  ></li>
                ))}
              </ul>
            </div>
            <div>
              <Input
                name="minimumPrice"
                type="number"
                onChange={(event) => {
                  setPriceRange((oldState) => ({
                    ...oldState,
                    minimumPrice: event.target.value,
                  }));
                }}
                placeholder="Minimum price"
                label="Enter price range"
                variant="standard"
                size="s"
              />{" "}
              to
              <Input
                type="number"
                onChange={(event) => {
                  setPriceRange((oldState) => ({
                    ...oldState,
                    maximumPrice: event.target.value,
                  }));
                }}
                name="maximumPrice"
                placeholder="Maximum price"
                variant="standard"
                size="s"
              />
              <Button
                onClick={(event) => {
                  let query = new URLSearchParams({});
                  if (currentColor) {
                    query.set("color", currentColor);
                  }
                  query.set("minimumPrice", priceRange.minimumPrice);
                  query.set("maximumPrice", priceRange.maximumPrice);
                  fetch(`/api/products?${query.toString()}`)
                    .then((response) => response.json())
                    .then((filteredOrders) => {
                      setProducts(filteredOrders.result);
                    });
                }}
                type="button"
                variant="link"
              >
                Go
              </Button>
            </div>
            <div className="cart">
              <div
                style={{ display: "flex", alignItems: "center", gap: "40px" }}
              >
                <p>My Cart </p>
                <Button
                  onClick={(event) => {
                    let cartInfo = productsInCart.reduce(
                      (cartInfo, productId) => {
                        if (cartInfo[productId]) {
                          cartInfo[productId] += 1;
                        } else {
                          cartInfo[productId] = 1;
                        }
                        return cartInfo;
                      },
                      {}
                    );
                    let products = Object.entries(cartInfo).map(
                      ([id, quantity]) => ({ id, quantity })
                    );
                    fetch("/api/checkout", {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify({ products }),
                    })
                      .then((res) => res.json())
                      .then((session) => {
                        window.open(session.url, "_blank");
                      });
                  }}
                  variant="link"
                >
                  Buy
                </Button>
              </div>
              <ul>
                {products
                  .filter((product) => productsInCart.includes(product.id))
                  .map((product) => {
                    return (
                      <li className="cart-item" key={product.id}>
                        <img
                          alt=""
                          width={"50px"}
                          height={"50px"}
                          src="https://m.media-amazon.com/images/I/61qxFd8MHlL._SX679_.jpg"
                        />
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">
                          INR {product.price}
                          <div
                            className="color"
                            style={{ "--color-fill": product.color }}
                          >
                            {" "}
                          </div>
                          <p>
                            Quantity:{" "}
                            {
                              productsInCart.filter((ids) => ids === product.id)
                                .length
                            }{" "}
                          </p>
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </section>
          <ul className="catalogue">
            {products.map((product) => {
              return (
                <li className="product" key={product.id}>
                  <img
                    alt=""
                    src="https://m.media-amazon.com/images/I/61qxFd8MHlL._SX679_.jpg"
                  />
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">
                    INR {product.price}
                    <div
                      className="color"
                      style={{ "--color-fill": product.color }}
                    >
                      {" "}
                    </div>
                    <Button
                      style={{ marginTop: "10px" }}
                      onClick={() => {
                        setProductsInCart([...productsInCart, product.id]);
                      }}
                      variant="standard"
                    >
                      Add to Cart
                    </Button>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
