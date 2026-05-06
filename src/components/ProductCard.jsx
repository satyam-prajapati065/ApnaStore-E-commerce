import React, { useContext } from "react";
import { Eye, Heart, Star } from "lucide-react";
import "./ProductCard.css";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <div className="cart-up">
        <div className="cart-up">
          <Link to={`/product/${product.id}`} className="cart-img">
            <img src={product.thumbnail} alt={product.title} />
          </Link>
          <div className="cart-icons">
            <div className="icons">
              <Eye />
            </div>
            <button
              className="icons"
              onClick={() => {
                isLoggedIn
                  ? wishlistDispatch({
                      type: "TOGGLE",
                      payload: product,
                    })
                  : navigate("/login");
              }}
            >
              {wishlist.find((item) => item.id === product.id) ? (
                <Heart fill="red" color="red" />
              ) : (
                <Heart />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="cart-down">
        <p className="cart-title">{product.title}</p>
        <div className="price-box">
          <p className="price">${product.price}</p>
          <p className="dis-price" style={{ color: "green" }}>
            {product.discountPercentage}% off
          </p>
        </div>
        <div className="rating-cart-box">
          <div className="rating-box">
            <div className="five-star">
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  fill={
                    index <= Math.round(product.rating)
                      ? "#FFAD33"
                      : "transparent"
                  }
                  color={
                    index <= Math.round(product.rating) ? "#FFAD33" : "#D1D1D1"
                  }
                />
              ))}
            </div>
            <p className="total-rating">{product.reviews.length} Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
