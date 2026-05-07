import React from "react";
import { Eye, Heart, Star } from "lucide-react";
import "./ProductCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE } from "../Redux/wishlistSlice";

function ProductCard({ product }) {
  const wishlists = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistDispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isWishlisted = wishlists.some((item) => item.id === product?.id);

  const productRating = product?.rating || 0;
  const totalReviews = product?.reviews?.length || 0;

  return (
    <div className="cart-container">
      <div className="cart-up">
        <Link to={`/product/${product?.id}`} className="cart-img">
          <img src={product?.thumbnail} alt={product?.title} />
        </Link>
        <div className="cart-icons">
          <div
            className="icons"
            onClick={() => navigate(`/product/${product?.id}`)}
            style={{ cursor: "pointer" }}
          >
            <Eye />
          </div>
          <button
            className="icons"
            onClick={() => {
              isLoggedIn
                ? wishlistDispatch(TOGGLE(product))
                : navigate("/login");
            }}
          >
            {isWishlisted ? <Heart fill="red" color="red" /> : <Heart />}
          </button>
        </div>
      </div>

      <div className="cart-down">
        <p className="cart-title">{product?.title}</p>
        <div className="price-box">
          <p className="price">${product?.price}</p>
          {product?.discountPercentage && (
            <p className="dis-price" style={{ color: "green" }}>
              {product.discountPercentage}% off
            </p>
          )}
        </div>
        <div className="rating-cart-box">
          <div className="rating-box">
            <div className="five-star">
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  fill={
                    index <= Math.round(productRating)
                      ? "#FFAD33"
                      : "transparent"
                  }
                  color={
                    index <= Math.round(productRating) ? "#FFAD33" : "#D1D1D1"
                  }
                />
              ))}
            </div>
            <p className="total-rating">{totalReviews} Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
