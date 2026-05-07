import React from "react";
import "./Checkout.css";
import Breadcrumbs from "../components/Breadcrumbs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const totalPrice = location.state;
  return (
    <div className="checkout-container">
      <nav className="breadcrumbs">
        <Breadcrumbs />
      </nav>

      <h1>Billing Details</h1>

      <div className="checkout-content">
        <form className="billing-form">
          <div className="input-group">
            <label>
              First Name<span>*</span>
            </label>
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>Company Name</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>
              Street Address<span>*</span>
            </label>
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>Apartment, floor, etc. (optional)</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>
              Town/City<span>*</span>
            </label>
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>
              Phone Number<span>*</span>
            </label>
            <input type="tel" required />
          </div>

          <div className="input-group">
            <label>
              Email Address<span>*</span>
            </label>
            <input type="email" required />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="save-info" defaultChecked />
            <label htmlFor="save-info">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>

        <div className="order-summary">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div className="item-info">
                  <img
                    src={item.thumbnail}
                    style={{ border: "1px solid #ccc" }}
                    alt={item.title}
                  />
                  <span className="items-name">{item.title}</span>
                </div>
                <span>Q. {item.quantity}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>

          <div className="pricing">
            <div className="price-row">
              <span>Subtotal:</span>
              <span>${totalPrice?.total}</span>
            </div>
            <hr />
            <div className="price-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="price-row total">
              <span>Total:</span>
              <span>${totalPrice?.total}</span>
            </div>
          </div>

          <div className="payment-options">
            <div className="radio-group">
              <input type="radio" name="payment" id="bank" />
              <label htmlFor="bank">Bank</label>
              <div className="payment-icons">
                <span className="icon-placeholder">💳</span>
              </div>
            </div>
            <div className="radio-group">
              <input type="radio" name="payment" id="cod" defaultChecked />
              <label htmlFor="cod">Cash on delivery</label>
            </div>
          </div>

          <div className="coupon-section">
            <input type="text" placeholder="Coupon Code" />
            <button className="apply-btn">Apply Coupon</button>
          </div>

          <button className="place-order-btn">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
