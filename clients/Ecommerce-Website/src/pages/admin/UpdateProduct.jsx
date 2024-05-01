import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import { url } from "../../url";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [id, setId] = useState("");
  const [checker, setChecker] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [checkPhotoChange, setPhotoChange] = useState(false);

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(url + `/product/product/${param.pid}`);
      setProduct(data.product);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.stock);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setImageUrl(data.product.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(url + "/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      if (checkPhotoChangeFunc && photo !== null) {
        handlePhotoUpdate(e);
        console.log("Photo ", photo);
      }
      const { data } = await axios.put(
        url + `/product/product/${param.pid}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    const photoData = new FormData();
    photoData.append("photo", photo);

    const { data } = await axios.put(
      url + `/product/image/${param.pid}`,
      photoData
    );
  };

  const handleDeleteProduct = async (e) => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      await axios.delete(url + `/product/product/${param.pid}`);
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const checkPhotoChangeFunc = () => {
    if (photo) {
      return true;
    } else {
      return false;
    }
  };

  // Function to check if form fields have changed
  const checkFormChanges = () => {
    return (
      name !== product?.name ||
      description !== product?.description ||
      price !== product?.price ||
      quantity !== product?.stock ||
      shipping !== product?.shipping ||
      category !== product?.category._id ||
      (photo && photo !== product?.photo)
    );
  };

  // Function to enable/disable the "UPDATE PRODUCT" button
  const checkDisable = () => {
    return !checkFormChanges();
  };
  // Update formChanged whenever form inputs change
  useEffect(() => {
    setFormChanged(checkFormChanges());
  }, [name, description, price, quantity, shipping, category, photo]);

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={imageUrl}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  disabled={checkDisable()}
                  onClick={handleUpdateProduct}
                >
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteProduct}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
