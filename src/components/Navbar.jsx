import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Settings,
  Package,
  Star,
  LogOut,
} from "lucide-react";
import brandLogo from "../../ApnaStore-logo.png";
import { useSelector } from "react-redux";

export default function Navbar({ search, setSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlists = useSelector((state) => state.wishlist.wishlistItems);

  const menu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    navigate("/login");
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="only-link brandLogoBox">
          <img src={brandLogo} alt="" />
          <span className="logo">Apna Store</span>
        </Link>
        <div className="menus">
          <NavLink className="nav-item" to="/">
            Home
          </NavLink>
          <NavLink className="nav-item" to="/contact">
            Contact
          </NavLink>
          <NavLink className="nav-item" to="/about">
            About
          </NavLink>
          {!isLoggedIn && (
            <NavLink className="nav-item" to="/signup">
              Sign Up
            </NavLink>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <div className="search-input-box">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <Search size={20} />
          </button>
        </div>
        <div className="user-section">
          <ul>
            <li>
              <NavLink to="/wishlist" className="nav-item user-icon">
                <Heart size={24} strokeWidth={1.5} />
                {isLoggedIn && (
                  <span className="cart-count">{wishlists.length}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="nav-item user-icon">
                <ShoppingCart size={24} strokeWidth={1.5} />
                {isLoggedIn && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <li className="user-menu-wrapper">
                <NavLink
                  className="nav-item"
                  to="/login"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1rem",
                    color: "red",
                  }}
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="user-menu-wrapper" onClick={menu}>
                <div
                  className={`nav-item user-icon ${isMenuOpen ? "active-icon" : ""}`}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "red",
                    color: "#fff",
                  }}
                >
                  <User size={24} strokeWidth={1.5} />
                </div>
                {isMenuOpen && (
                  <div className="user-dropdown-box">
                    <p className="user-name">
                      <User size={18} strokeWidth={2.5} />
                      {user.name.toUpperCase()}
                    </p>
                    <Link to="/profile" className="dropdown-item">
                      <Settings size={18} /> Manage My Account
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      <Package size={18} /> My Order
                    </Link>
                    <Link to="/reviews" className="dropdown-item">
                      <Star size={18} /> My Reviews
                    </Link>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
