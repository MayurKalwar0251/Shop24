import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cart";
const ProductDetails = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    params.pid && getProduct();
  }, []);

  async function getProduct() {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/product/product/${params.pid}`
    );
    console.log(data.product);
    setProduct(data.product);
  }

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
    <Layout>
      <h1 className="text-center my-3 ">Product Details</h1>
      <div className="row container w-100  d-flex justify-content-center mt-2">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            className="card-img-top object-fit-fill"
            alt={product.name}
            height="400"
          />
        </div>
        <div className="col-md-6 d-flex flex-column gap-3">
          <h4>Name : {product.name}</h4>
          <h5>Description : {product.description}</h5>
          <h5>Price : {product.price}</h5>
          <h6>Category : {product?.category?.name}</h6>
          <button
            onClick={() => {
              addToCart(product);
            }}
            className="btn btn-secondary ms-1"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
