import React, { useState } from "react";
import { useSearch } from "../../contexts/search";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [value, setValue] = useSearch();
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/search/${value.keyword}`
      );

      if (data.success) {
        setValue({ ...value, products: data.products });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  const isKeywordEmpty = value.keyword.trim() === ""; // Check if the keyword is empty or only contains spaces

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={value.keyword}
        onChange={(e) => {
          setValue({ ...value, keyword: e.target.value });
        }}
      />
      <button
        className="btn btn-outline-primary"
        disabled={isKeywordEmpty}
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
