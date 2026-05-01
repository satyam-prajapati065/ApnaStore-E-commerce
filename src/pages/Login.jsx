import { Link, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const savedData = localStorage.getItem("userData");

    if (!savedData) {
      alert("No user found! Please Signup.");
      navigate("/signup");
      return;
    }

    const user = JSON.parse(savedData);

    if (user.email === formData.email && user.password === formData.password) {
      alert(`Welcome ${user.name}`);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));

      navigate("/");
      window.location.reload();
    } else {
      alert("Wrong Email or Password");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-img-container">
        <img
          src="https://lifelinemedicalsupply.net/static/media/authimg.3e68db7c28df1d985f02.png"
          alt=""
        />
      </div>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <div className="signup-header">
          <span>Log in to Exclusive</span>
          <p>Enter your details below</p>
        </div>
        <div className="signup-form">
          <div className="input-boxe-container">
            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="Email or Phone"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <input
                type="Password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="signup-btn login-btn">
            <button type="submit">Login</button>
            <Link className="only-link">Forget Password</Link>
          </div>
          <p style={{ marginTop: "1rem" }}>
            Create account{" "}
            <Link
              to="/login"
              style={{ color: "var(--secondary2)", fontWeight: "600" }}
              className="only-link"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
