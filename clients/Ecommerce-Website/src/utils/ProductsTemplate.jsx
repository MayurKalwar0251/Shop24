import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cart";

const ProductsTemplate = ({ products }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const addToCart = (p) => {
    const productExists = cart.find((c) => c._id === p._id);
    if (productExists) {
      return;
    }
    const newCart = [...cart, p];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-md-center">
      {products?.map((p) => (
        <div className="card m-1" style={{ width: "18rem" }}>
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

            <div>
              <button
                className="btn btn-primary px-2 mx-2"
                onClick={() => {
                  navigate(`/product-details/${p._id}`);
                }}
              >
                More Details
              </button>
              <button
                className="btn btn-primary px-2"
                onClick={() => {
                  addToCart(p);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsTemplate;
