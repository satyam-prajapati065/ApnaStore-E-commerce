import React from "react";
import { Eye, Heart, Star } from "lucide-react";
import "./ProductCard.css";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <div className="cart-container">
      <div className="cart-up">
        <Link to={`/product/${product.id}`} className="cart-up">
          <div className="cart-img">
            <img src={product.thumbnail} />
          </div>
          <div className="cart-icons">
            <div className="icons">
              <Eye />
            </div>
            <div className="icons">
              {/* <button className="icons"> */}
              <Heart />
              {/* </button> */}
            </div>
          </div>
        </Link>
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
