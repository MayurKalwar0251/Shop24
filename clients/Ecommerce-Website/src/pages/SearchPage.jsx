import React from "react";
import { useSearch } from "../contexts/search";
// import { Layout } from "antd";
import Layout from "../components/Layout";
import ProductsTemplate from "../utils/ProductsTemplate";

const SearchPage = () => {
  const [value, setValue] = useSearch();

  return (
    <Layout>
      {value.products.length < 1 ? (
        "No Products Found"
      ) : (
        <>
          <h1 className="mt-2 text-center">Searched Products</h1>
          <ProductsTemplate products={value.products} />
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
