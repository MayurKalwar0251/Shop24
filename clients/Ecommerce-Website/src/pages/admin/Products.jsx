import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  async function getAllProducts() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/product/get-products"
      );

      if (res.data.success) {
        setProducts(res.data.product);
      }
    } catch (error) {
      console.log(toast.error("Something went wrong"));
      console.log(error);
    }
  }

  async function handlePagination() {
    try {
      const nextPage = page + 1; // Calculate the next page before updating state

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-products?page=${nextPage}`
      );

      if (data.success) {
        setPage(nextPage); // Update the page state
        setProducts((prevProducts) => [...prevProducts, ...data.product]); // Update products state correctly
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container m-5 w-100 overflow-hidden">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap justify-content-md-start">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p._id}`}
                  className="product-link m-2"
                >
                  <div className="card " style={{ width: "18rem" }}>
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button
              onClick={handlePagination}
              className="btn btn-danger p-2 px-3 "
            >
              {"Next"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
