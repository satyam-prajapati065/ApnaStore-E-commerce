import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.name.trim().length < 3) {
      setError("Name must be at least 3 characters long!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Account Created Successfully! Please login now.");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-img-container">
        <img
          src="https://lifelinemedicalsupply.net/static/media/authimg.3e68db7c28df1d985f02.png"
          alt="Auth"
        />
      </div>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <div className="signup-header">
          <span>Create an account</span>
          <p>Enter your details below</p>
        </div>

        {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

        <div className="signup-form">
          <div className="input-boxe-container">
            <div className="input-box">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="signup-btn">
            <button type="submit">Create Account</button>
            <div className="other-signup">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "var(--secondary2)", fontWeight: "600" }}
                  className="only-link"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
