import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/Menu/UserMenu";
import { useAuth } from "../../contexts/auth";

const DashBoard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="m-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-50">
              <div className="card-body">
                <h5 className="card-title">Name : {auth.user.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Email : {auth.user.email}
                </h6>
                <p className="card-text">PhoneNo : {auth.user.phoneNO}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
