import { Link, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    localStorage.setItem("userData", JSON.stringify(newUser));

    alert("Account Created Successfully!");
    navigate("/login");
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
          <span>Create an account</span>
          <p>Enter your details below</p>
        </div>
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
                type="text"
                name="email"
                value={formData.email}
                placeholder="Email or Phone Number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="Password"
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
              <div className="google-signup">
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width="20"
                  height="20"
                />
                <span>Sign up with Google</span>
              </div>
              <p>
                Already have account?{" "}
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
