import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../utils/Prices";
import ProductsTemplate from "../utils/ProductsTemplate";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ checked: [], radio: [0, 10000] });

  async function handlePagination() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/all-products?page=${
          page + 1
        }&category=${filters.checked}&minPrice=${filters.radio[0]}&maxPrice=${
          filters.radio[1]
        }`
      );
      if (data.success) {
        setPage(page + 1);
        const prod = products.concat(data.products);
        setProducts(prod);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function totalProductCount() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/total"
      );
      if (data.success) {
        setTotalCount(data.total);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function getAllCategory() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/all-category"
      );

      if (response.data.success) {
        setCategory(response.data.category);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/all-products?page=${page}&category=${filters.checked}&minPrice=${filters.radio[0]}&maxPrice=${filters.radio[1]}`
      );

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  }

  useEffect(() => {
    totalProductCount();
    getAllCategory();
    getAllProducts();
  }, []);

  const handleFilter = (checkedValue, catId) => {
    const updatedFilters = {
      ...filters,
      checked: checkedValue
        ? [...filters.checked, catId]
        : filters.checked.filter((c) => c !== catId),
    };
    setFilters(updatedFilters);
  };

  const handlePriceFilter = (priceValue) => {
    const updatedFilters = { ...filters, radio: priceValue };
    setFilters(updatedFilters);
  };

  async function handleResetFilter() {
    setFilters({ checked: [], radio: [0, 10000] });
    window.location.reload;
    getAllProducts();
  }

  useEffect(() => {
    console.log("filter", filters);
    console.log("catgeory", category);
    getAllProducts();
  }, [filters]);

  return (
    <Layout>
      <div className="m-2 row">
        <div className="col-md-3 col-12 d-flex flex-column gap-3 border text-center align-items-center my-2">
          <div className="p-2 my-2">
            <h5>Filter Products By Category</h5>
            <div className="d-flex flex-column align-items-center">
              {category?.map((c) => (
                <Checkbox
                  key={c._id}
                  checked={filters.checked.includes(c._id)}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column">
            <h5>Filter Products By Prices</h5>
            <Radio.Group
              value={filters.radio}
              onChange={(e) => handlePriceFilter(e.target.value)}
            >
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button className="btn btn-danger p-2 " onClick={handleResetFilter}>
            Reset Filters
          </button>
        </div>
        <div className=" col-md-9 col-12 border ">
          <h1 className="text-center">All Products</h1>
          <ProductsTemplate products={products} />
          {products.length < totalCount && (
            <button
              onClick={handlePagination}
              className="btn btn-danger p-2 px-3 "
            >
              {loading ? "Loading ..." : "Next"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
