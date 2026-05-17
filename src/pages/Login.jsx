import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_CART } from "../Redux/cartSlice";
import { SET_WISHLIST } from "../Redux/wishlistSlice";
import Modal from "../components/Modal";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const savedData = localStorage.getItem("userData");

    if (!savedData) {
      setError("No user database found! Please Sign Up first.");

      return;
    }
    const users = JSON.parse(savedData);
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (user) {
      setModal({
        open: true,
        type: `success`,
        msg: `Welcome Back ${user.firstName}!`,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(SET_CART(user.cart || []));
      dispatch(SET_WISHLIST(user.wishlist || []));
    } else {
      setError("Incorrect email or password!");
    }
  };
  const closeModal = () => {
    setModal({ ...modal, open: false });
    if (modal.type === "success") navigate("/");
  };
  return (
    <div className="signup-container">
      <Modal
        isOpen={modal.open}
        type={modal.type}
        message={modal.msg}
        onClose={closeModal}
      />
      <div className="signup-img-container">
        <img
          src="https://lifelinemedicalsupply.net/static/media/authimg.3e68db7c28df1d985f02.png"
          alt="Auth"
        />
      </div>

      <form className="signup-form-container" onSubmit={handleSubmit}>
        <div className="signup-header">
          <span>Log in to Exclusive</span>

          <p>Enter your details below</p>
        </div>

        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <div className="signup-form">
          <div className="input-boxe-container">
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-btn login-btn">
            <button type="submit">Login</button>

            <Link className="only-link">Forget Password?</Link>
          </div>

          <p style={{ marginTop: "1rem" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "var(--secondary2)",
                fontWeight: "600",
              }}
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
