import React from "react";
import { Send } from "lucide-react";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-content-boxes">
          <h3>Exclusive</h3>
          <div className="footer-content-boxe-text">
            <span>Subscribe</span>
            <p>Get 10% off your first order</p>
            <div className="send-email">
              <input type="email" placeholder="Enter your email" />
              <button className="send-email-btn">
                <Send size={25} />
              </button>
            </div>
          </div>
        </div>
        <div className="footer-content-boxes">
          <h3>Support</h3>
          <div className="footer-content-boxe-text">
            <p>Tagore town, Prayagraj, Uttar Pradesh, India</p>
            <p>apnastore@gmail.com</p>
            <p>+91 9876543210</p>
          </div>
        </div>
        <div className="footer-content-boxes">
          <h3>Account</h3>
          <div className="footer-content-boxe-text">
            <p>My Account</p>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
          </div>
        </div>
        <div className="footer-content-boxes">
          <h3>Quick Link</h3>
          <div className="footer-content-boxe-text">
            <p>Privacy Policy</p>
            <p>Terms Of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
        </div>
        <div className="footer-content-boxes">
          <h3>Download App</h3>
          <div className="footer-content-boxe-text">
            <p>Save 5$ with App New User Only</p>
            <div className="scanner-box-inner">
              <img
                src="https://i.pinimg.com/736x/a8/69/40/a86940a4ed8a69539b341f3c414c47b3.jpg"
                alt=""
                className="qr-code"
              />
              <img
                src="https://images.seeklogo.com/logo-png/37/2/app-store-google-play-logo-png_seeklogo-370449.png"
                alt=""
                className="appstore"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; Copyright 2026. All right reserved</p>
      </div>
    </div>
  );
}

export default Footer;
