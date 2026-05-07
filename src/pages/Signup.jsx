import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    if (formData.firstName.trim().length < 3) {
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
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    const userExists = users.find((user) => user.email === formData.email);

    if (userExists) {
      setError("Email already registered!");
      return;
    }
    const newUser = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      address: "",
      cart: [],
      wishlist: [],
    };
    users.push(newUser);
    localStorage.setItem("userData", JSON.stringify(users));
    alert("Account Created Successfully!");
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
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
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
