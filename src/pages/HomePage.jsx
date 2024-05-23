import React, { useState } from "react";

import { useEffect } from "react";
//import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { userData } from "../api/auth";

const HelloPage = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUser = async (jwt) => {
    const existingUser = await userData(jwt);
    setUser(existingUser);
  };

  useEffect(() => {
    // Redirect to login page if user is not authenticated

    const expiresAt = localStorage.getItem("expiresAt");
    console.log(localStorage.getItem("jwt"));
    if (!localStorage.getItem("jwt")) {
      navigate("/");
    } else {
      getUser(localStorage.getItem("jwt"));
    }

    console.log(
      " current date :: " + new Date(),
      "expiration date :: " + new Date(expiresAt)
    );

    if (new Date() > new Date(expiresAt)) {
      console.log("12344");
      localStorage.removeItem("jwt");
      localStorage.removeItem("expiresAt");
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("expiresAt");
    navigate("/");
  };

  return (
    <div className="container ">
      {user ? (
        <>
          {/* <h1>Hello, {localStorage.getItem("expiresAt")}!</h1>
                    
                <button onClick={logout}>Logout</button> */}

          <div className="card mt-5 w-50 mx-auto">
            <div className="card-header">
              <button className="btn btn-danger float-end " onClick={logout}>
                Logout
              </button>
            </div>
            <div className="card-body ">
              <h1>
                Hello, <span className="text-primary ">{user.username}!</span>
              </h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda laboriosam eligendi ex. Deleniti, et alias maxime
                deserunt quo illum rem?
              </p>
            </div>
          </div>
        </>
      ) : (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelloPage;
