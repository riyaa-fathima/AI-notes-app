import React from "react";
import { useState } from "react";
import "../styles/Login.scss";

export default function Login() {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {

    
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setError("");
  };



  return (
    <>
      <div className="login-page d-flex justify-content-center align-items-center">
        <div className="login-card">
          <h2 className=" login-head text-center mb-4">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group mb-4">
                <input
                  type="name"
                  className="form-control custom-input"
                  name="name"
                  onChange={handleChange}
                  required
                />
                <label>Name</label>
              </div>
            )}
            <div className="form-group mb-4">
              <input
                type="email"
                className="form-control custom-input"
                name="name"
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control custom-input"
                name="name"
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>
            {!isLogin && (
              <div className="form-group mb-4">
                <input
                  type="password"
                  className="form-control custom-input"
                  name="password"
                  onChange={handleChange}
                  required
                />
                <label> Confirm Password</label>
              </div>
            )}
            <button type="submit" className="btn  w-100">
              {isLogin ? "Login" : "Sign up"}
            </button>

            <div className="login-links mt-3">
              <span>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <button
                type="button"
                className="auth-switch"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create an account" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
