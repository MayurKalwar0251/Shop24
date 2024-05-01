import React from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/Menu/UserMenu";

const Profile = () => {
  return (
    <Layout>
      <div className="m-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-50">My Profile</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
