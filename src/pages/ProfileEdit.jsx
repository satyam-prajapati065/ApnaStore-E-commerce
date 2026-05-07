import React, { useState } from "react";
import "./ProfileEdit.css";
import Breadcrumbs from "../components/Breadcrumbs";

const ProfileEdit = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    address: user.address || "",
    currentPass: "",
    password: "",
    confirmPass: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSaveChange = (e) => {
    e.preventDefault();
    let allUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const userIndex = allUsers.findIndex((u) => u.email === user.email);

    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      name: `${formData.firstName} ${formData.lastName}`,
    };

    if (userIndex !== -1) {
      allUsers[userIndex] = updatedUser;
      localStorage.setItem("userData", JSON.stringify(allUsers));
    }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    alert("Profile Updated!");
    window.location.reload();
  };
  return (
    <div className="profile-container">
      <div className="profile-header">
        <nav className="breadcrumb">
          <Breadcrumbs />
        </nav>
        <p className="welcome-msg">
          Welcome!{" "}
          <span>
            {user.firstName} {user.lastName}
          </span>
        </p>
      </div>

      <div className="profile-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Manage My Account</h3>
            <ul>
              <li className="active">My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>My Orders</h3>
            <ul>
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>My WishList</h3>
          </div>
        </aside>

        <main className="edit-profile-card">
          <h2 className="form-title">Edit Your Profile</h2>

          <form className="profile-form">
            <div className="form-row">
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="password-section">
              <label>Password Changes</label>
              <input
                type="password"
                name="currentPass"
                value={formData.currentPass}
                onChange={handleChange}
                placeholder="Current Password"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
              />
              <input
                type="password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
                placeholder="Confirm New Password"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn">
                Cancel
              </button>
              <button
                type="submit"
                className="save-btn"
                onClick={handleSaveChange}
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ProfileEdit;
