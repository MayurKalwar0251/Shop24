import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/Menu/AdminMenu";
import Layout from "../../components/Layout";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/admin/all-users"
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateRole = async (uid) => {
    try {
      console.log(uid);
      const response = await axios.put(
        `http://localhost:5000/api/v1/auth/admin/update-role?uid=${uid}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="m-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <h5 className="card-header">All Users</h5>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Update Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <p>{user.role ? "Admin" : "User"}</p>
                          </div>
                        </td>
                        <td>
                          <div></div>
                          {user.role ? (
                            <div></div>
                          ) : (
                            <button
                              onClick={() => {
                                updateRole(user._id);
                              }}
                              className="btn btn-primary"
                            >
                              Update
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;
