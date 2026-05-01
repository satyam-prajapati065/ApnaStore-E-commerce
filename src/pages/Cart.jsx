import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link, useNavigate } from "react-router";
import Support from "../components/Support";

function Cart() {
  const { cart, dispatch } = useContext(CartContext);
  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const navigate = useNavigate();

  return (
    <div className="display-cart-container">
      <nav className="breadcrumbs">
        <Breadcrumbs />
      </nav>
      <div className="main-cart-container">
        <section className="cart-table">
          <table>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>Product</th>
                <th style={{ width: "13%" }}>Price</th>
                <th style={{ width: "20%" }}>Quantity</th>
                <th style={{ width: "17%" }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.length !== 0 ? (
                cart.map((item) => (
                  <tr key={item.title}>
                    <td className="product-info">
                      <img
                        src={item.thumbnail}
                        style={{ border: "1px solid #ccc" }}
                        alt=""
                      />
                      <span>{item.title}</span>
                    </td>
                    <td className="price">${item.price}</td>
                    <td>
                      <div className="quantity-container">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            })
                          }
                        >
                          -
                        </button>
                        <div className="quantity-text">{item.quantity}</div>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            dispatch({ type: "ADD_TO_CART", payload: item })
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.quantity * item.price}</td>
                  </tr>
                ))
              ) : (
                <tr
                  style={{
                    width: "100%",
                    padding: "5rem 0px",
                    textAlign: "center",
                  }}
                >
                  <td>Cart is empty</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="table-actions">
            <button
              className="btn-outline"
              onClick={() => {
                navigate("/");
              }}
            >
              Return To Shop
            </button>
            {/* <button className="btn-outline">Update Cart</button> */}
          </div>
        </section>

        <section className="cart-bottom">
          <div className="coupon-section">
            <input type="text" placeholder="Coupon Code" />
            <button className="btn-primary">Apply Coupon</button>
          </div>

          <div className="cart-total-card">
            <h3>Cart Total</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            <hr />
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button className="btn-primary full-width">
              Process to checkout
            </button>
          </div>
        </section>
      </div>
      <Support />
    </div>
  );
}

export default Cart;
