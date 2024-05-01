import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [getSingleCategory, setSignleCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [stock, setstock] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function getAllCategory() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/all-category"
      );

      if (response.data.success) {
        setCategory(response.data.category);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong error");
    }
  }
  useEffect(() => {
    getAllCategory();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", getSingleCategory);
      formData.append("stock", stock);
      formData.append("shipping", shipping);
      formData.append("photo", photo);
      console.log(photo);
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/create-product",
        formData
      );

      if (res.data?.success) {
        toast.success(res.data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function checkDisable() {
    return (
      loading ||
      !(
        photo &&
        name &&
        description &&
        price &&
        getSingleCategory &&
        stock &&
        shipping
      )
    );
  }

  console.log(checkDisable());

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="m-1 w-75">
              <h1 className="text-center">Create Product</h1>
              <form
                action="upload"
                onSubmit={handleCreate}
                className="m-3 d-flex flex-column gap-3"
              >
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setSignleCategory(value);
                  }}
                >
                  {category?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />

                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  value={stock}
                  placeholder="write a stock"
                  className="form-control"
                  onChange={(e) => setstock(e.target.value)}
                />
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
                <button disabled={checkDisable()} className="btn btn-primary">
                  {loading ? "Creating..." : "CREATE PRODUCT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
