import React from "react";
import Sidebar from "../components/Sidebar";
import { Route } from "react-router-dom";

const Adminlayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Route render={(props) => <Sidebar {...props} />} />
      <div className="admin-content">
        <div className="admin-wrapper">{children}</div>
      </div>
    </div>
  );
};

export default Adminlayout;
