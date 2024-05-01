import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import Form from "./Form";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/category/add",
        {
          name,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getAllCategory();
        setName("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${id}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getAllCategory();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function updateCategory(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setSelected(null);
        getAllCategory();
        setUpdatedName("");
        setIsModalOpen(false); // Close the modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="m-5 w-100 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75">Manage Category</div>
            <div>
              <Form name={name} setName={setName} handleSubmit={handleSubmit} />
            </div>

            <div>
              <table className="table w-75">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            style={{ display: isModalOpen ? "block" : "none" }}
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                  >
                                    Enter Category Name
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  />
                                </div>
                                <Form
                                  name={updatedName}
                                  setName={setUpdatedName}
                                  handleSubmit={updateCategory}
                                />
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setSelected(c);
                                      setIsModalOpen(false); // Close the modal
                                    }}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
