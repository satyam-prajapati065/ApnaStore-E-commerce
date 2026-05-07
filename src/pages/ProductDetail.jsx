import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import useFetch from "../Custom Hooks/usefetch";
import Breadcrumbs from "../components/Breadcrumbs";
import { Heart, TruckElectric, RefreshCcw, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SkeletonCardDetail from "../components/SkeletonCardDetail";
import SkeletonCard from "../components/SkeletonCard";
import Support from "../components/Support";
import { ProductContext } from "../context/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "../Redux/cartSlice";
import { TOGGLE } from "../Redux/wishlistSlice";

function ProductDetail() {
  const { id } = useParams();
  const wishlists = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistDispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartDispatch = useDispatch();
  const navigate = useNavigate();

  const { products: currentProduct, loading } = useFetch(
    `https://dummyjson.com/products/${id}`,
  );
  const { products: relatedProduct } = useContext(ProductContext);

  const [activeImage, setActiveImage] = useState(null);
  useEffect(() => {
    if (currentProduct) {
      setActiveImage(currentProduct.thumbnail);
    }
  }, [currentProduct]);

  const cartItem = currentProduct
    ? cartItems.find((item) => item.id === currentProduct.id)
    : null;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="display-product-details">
      <nav className="breadcrumbs">
        <Breadcrumbs />
      </nav>
      <div className="main-product-details">
        {loading || !currentProduct ? (
          <SkeletonCardDetail />
        ) : (
          <>
            <div className="product-gallery">
              <div className="thumbnail-list">
                {currentProduct.images && currentProduct.images.length > 0 ? (
                  currentProduct.images.slice(0, 4).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`view ${index + 1}`}
                      onClick={() => setActiveImage(img)}
                      style={{
                        cursor: "pointer",
                        border:
                          activeImage === img
                            ? "2px solid #FFAD33"
                            : "1px solid #D1D1D1",
                        borderRadius: "4px",
                      }}
                    />
                  ))
                ) : (
                  <>
                    <img
                      src={currentProduct.thumbnail}
                      alt="view 1"
                      onClick={() => setActiveImage(currentProduct.thumbnail)}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                )}
              </div>
              <div className="main-image">
                <img
                  src={activeImage || currentProduct.thumbnail}
                  alt={currentProduct.title}
                />
              </div>
            </div>

            <div className="product-detail-info">
              <h1 className="product-title">{currentProduct.title}</h1>
              <div className="rating-stock">
                <div className="five-star">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <Star
                      key={index}
                      fill={
                        index <= Math.round(currentProduct.rating || 0)
                          ? "#FFAD33"
                          : "transparent"
                      }
                      color={
                        index <= Math.round(currentProduct.rating || 0)
                          ? "#FFAD33"
                          : "#D1D1D1"
                      }
                    />
                  ))}
                </div>
                <span className="reviews">
                  {currentProduct.reviews?.length || 0} Reviews
                </span>
                <span className="divider">|</span>
                <span className="stock-status">
                  {currentProduct.stock} items In Stock
                </span>
              </div>

              <div className="price" style={{ fontSize: "30px" }}>
                ${currentProduct.price}
              </div>

              <p className="description">{currentProduct.description}</p>

              <hr />

              <div className="options">
                <div className="option-row">
                  <span>Colours:</span>
                  <div className="color-picker">
                    <span className="color-circle blue active"></span>
                    <span className="color-circle red"></span>
                  </div>
                </div>

                <div className="option-row">
                  <span>Size:</span>
                  <div className="size-picker">
                    <button>XS</button>
                    <button>S</button>
                    <button className="active">M</button>
                    <button>L</button>
                    <button>XL</button>
                  </div>
                </div>
              </div>

              <div className="purchase-actions">
                {cartItem ? (
                  <div className="quantity-container">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        cartDispatch(DECREMENT_QUANTITY(currentProduct.id))
                      }
                    >
                      -
                    </button>
                    <div className="quantity-text">{cartItem.quantity}</div>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        cartDispatch(INCREMENT_QUANTITY(currentProduct.id))
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="buy-now-btn add-to-cart-btn"
                    onClick={() =>
                      isLoggedIn
                        ? cartDispatch(ADD_TO_CART(currentProduct))
                        : navigate("/login")
                    }
                  >
                    Add to Cart
                  </button>
                )}

                <button className="buy-now-btn">Buy Now</button>
                <button
                  className="wishlist-btn"
                  onClick={() => wishlistDispatch(TOGGLE(currentProduct))}
                >
                  {wishlists.find((item) => item.id === currentProduct.id) ? (
                    <Heart fill="red" color="red" />
                  ) : (
                    <Heart />
                  )}
                </button>
              </div>

              <div className="delivery-box">
                <div className="delivery-item">
                  <TruckElectric />
                  <div>
                    <p>Free Delivery</p>
                    <small>
                      Enter your postal code for Delivery Availability
                    </small>
                  </div>
                </div>
                <hr />
                <div className="delivery-item">
                  <RefreshCcw />
                  <div>
                    <p>Return Delivery</p>
                    <small>
                      Free 30 Days Delivery Returns. <u>Details</u>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="related-items-container">
        <div className="related-items-box">
          <div className="rect"></div>
          <h3>Related Items</h3>
        </div>
        <div
          className="cart-box1"
          style={{
            display: "flex",
            gap: "30px",
            width: "100%",
            overflow: "scroll hidden",
            height: "420px",
            padding: "1rem",
          }}
        >
          {loading
            ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
            : relatedProduct?.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
        </div>
      </div>
      <Support />
    </div>
  );
}

export default ProductDetail;
