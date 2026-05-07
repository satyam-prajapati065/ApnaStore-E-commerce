import "./Cart.css";
import Breadcrumbs from "../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import Support from "../components/Support";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "../Redux/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartDispatch = useDispatch();

  const total = cartItems
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
              {cartItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    Cart is empty
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="product-info">
                      <img
                        src={item.thumbnail}
                        style={{ border: "1px solid #ccc" }}
                        alt={item.title}
                      />
                      <span>{item.title}</span>
                    </td>
                    <td className="price">${item.price}</td>
                    <td>
                      <div className="quantity-container">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            cartDispatch(DECREMENT_QUANTITY(item.id))
                          }
                        >
                          -
                        </button>
                        <div className="quantity-text">{item.quantity}</div>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            cartDispatch(INCREMENT_QUANTITY(item.id))
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="table-actions">
            <button className="btn-outline" onClick={() => navigate("/")}>
              Return To Shop
            </button>
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
