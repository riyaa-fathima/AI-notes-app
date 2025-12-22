import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 🔒 Frontend validation FIRST
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(`${baseUrl}/user/login`, {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setSuccess(`Welcome back, ${res.data.user.name}`);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // SIGN UP
        const res = await axios.post(`${baseUrl}/user/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setSuccess("Account created successfully");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card">
        <h2 className="login-head text-center mb-4">
          {isLogin ? "LOGIN" : "SIGN UP"}
        </h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control custom-input"
                name="name"
                value={formData.name}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control custom-input"
              name="password"
              value={formData.password}
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirm Password</label>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
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
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
            >
              {isLogin ? "Create an account" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
