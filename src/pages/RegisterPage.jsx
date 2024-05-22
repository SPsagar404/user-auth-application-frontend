import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleClear = () =>{
    setUsername("");
    setPassword("");
    setError("");
    setPasswordError("");
    setUserNameError("");
  }

  const handleSubmit = async (e) => {
    setError("");
    setPasswordError("");
    setUserNameError("");
    if (!username) {
      setUserNameError("Please enter username");
    }
    if (!password) {
      setPasswordError("Please enter password");
    }
    e.preventDefault();
    try {
      const userData = await register(username, password);
      console.log(userData);
      if (userData) {
        alert(userData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (username && password) {
        setError(err.response.data.error);
      }
    }
  };

  return (
    <>
      <div className="container ">
        <div className="card w-50 mx-auto mt-5">
          <div className="card-header ">
            <h3 className="my-3 text-center ">Register Now</h3>
          </div>
          <div className="card-body ">
            <div className="col-12">
              <label>
                Username<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <div className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            {userNameError && (
              <div className="text-danger text-text-center py-2">
                {userNameError}
              </div>
            )}
            <div className="col-12">
              <label>
                Password<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <div className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
            </div>
            {passwordError && (
              <div className="text-danger text-text-center py-2">
                {passwordError}
              </div>
            )}
            {error && (
              <div className="text-danger text-text-center py-2">{error}</div>
            )}
          </div>
          <div className="card-footer ">
            
            
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary px-4 float-start  my-3"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <div className="col-12">
                <Link to={"/"} className="px-4 float-start  my-3" style={{marginLeft:100}}>Already have an account!</Link>
              </div>
            <div className="col-12">
              <button
                type="reset"
                className="btn btn-danger px-4 float-end mt-3"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
