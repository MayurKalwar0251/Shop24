import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../contexts/cart";
import "./cart.css";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);

  const removeCartItem = (pid) => {
    const removeItemCart = cart.filter((p) => p._id !== pid);
    setCart(removeItemCart);
    localStorage.setItem("cart", JSON.stringify(removeItemCart));
  };

  const increaseQuantity = (pid, maxStock) => {
    const updatedCart = cart.map((item) =>
      item._id === pid && item.quantity < maxStock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = () => {
    let price = 0;
    cart.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotal(price);
  };

  useEffect(() => {
    totalPrice();
  }, [cart]);

  return (
    <Layout>
      <div className="container">
        {cart.length === 0 ? (
          <div
            style={{
              paddingTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="">No items in cart</div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex flex-wrap justify-content-center justify-content-md-center">
                {cart.map((p) => (
                  <div
                    className="card m-1"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      style={{ height: "18rem" }}
                      src={p.imageUrl}
                      className="card-img-top img-responsive object-fit-cover"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        {p.name.length > 20
                          ? `${p.name.toUpperCase().substring(0, 20)}...`
                          : p.name.toUpperCase()}
                      </h6>
                      <p className="card-text">
                        {p.description.length > 20
                          ? `${p.description.substring(0, 20)}...`
                          : p.description}
                      </p>
                      <p className="card-text">${p.price}</p>
                      <div className="d-flex flex-row align-items-center pb-2">
                        <button
                          className="addIconBtn"
                          onClick={() => decreaseQuantity(p._id)}
                        >
                          -
                        </button>
                        <p style={{ margin: "0 10px" }}>{p.quantity}</p>
                        <button
                          className="addIconBtn"
                          onClick={() => increaseQuantity(p._id, p.stock)}
                          disabled={p.quantity >= p.stock}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            removeCartItem(p._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="row justify-content-center mt-4">
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Price</h5>
                <p className="card-text">No of Items: {cart.length}</p>
                <p className="card-text">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
