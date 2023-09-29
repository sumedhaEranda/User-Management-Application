import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const [userCount,setUsercount]=useState("");
  const apiUrl = 'https://localhost:7260/api/User/GetAllUserCount'; // Replace with your API URL
  const jwtToken = localStorage.getItem("jwtToken");  // Replace with your JWT token

  const fetchDataWithToken = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });
      //set responce data
      setUsercount(response.data)
    
    } catch (error) {
      // Handle errors here
      history.push("auth/signin");
      console.error('Error:', error);
    }
  };

  // Call the fetchDataWithToken function when the component mounts
  useEffect(() => {
    fetchDataWithToken();
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard-widgets row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <div className="card-widget mb-2">
                <div className="widget-flex">
                  <div className="widget-icon">
                    <i className="bx bx-package"></i>
                  </div>
                  <div className="card-widget-body">
                    <h1 className="widget-count">{userCount}</h1>
                    <p className="widget-name">Users</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
