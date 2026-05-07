import { Eye, Trash2 } from "lucide-react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TOGGLE } from "../Redux/wishlistSlice";

function WishlistCard({ product }) {
  const wishlistDispatch = useDispatch();

  return (
    <div className="cart-container">
      <div className="cart-up">
        <Link to={`/product/${product.id}`} className="cart-img">
          <img src={product.thumbnail} alt={product.title} />
        </Link>
        <div className="cart-icons">
          <Link to={`/product/${product.id}`} className="icons">
            <Eye size={18} />
          </Link>
          <button
            className="icons"
            style={{ border: "none", cursor: "pointer", background: "none" }}
            onClick={() => wishlistDispatch(TOGGLE(product))}
          >
            <Trash2 size={18} color="red" />
          </button>
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
      </div>
    </div>
  );
}

export default WishlistCard;
