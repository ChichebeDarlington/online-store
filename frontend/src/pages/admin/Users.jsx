import React from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All users</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
