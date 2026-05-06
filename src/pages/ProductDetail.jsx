import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import useFetch from "../Custom Hooks/usefetch";
import Breadcrumbs from "../components/Breadcrumbs";
import { Heart, TruckElectric, RefreshCcw, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SkeletonCardDetail from "../components/SkeletonCardDetail";
import SkeletonCard from "../components/SkeletonCard";
import Support from "../components/Support";
import { WishlistContext } from "../context/WishlistContext";
import { ProductContext } from "../context/ProductContext";

function ProductDetail() {
  const { id } = useParams();
  const { cart, dispatch: cartDispatch } = useContext(CartContext);
  const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);
  const navigate = useNavigate();

  const { products: currentProduct, loading } = useFetch(
    `https://dummyjson.com/products/${id}`,
  );
  const { products: relatedProduct } = useContext(ProductContext);

  const cartItem = cart.find((item) => item.id === currentProduct.id);
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
                <img src={currentProduct.thumbnail} alt="view 1" />
                <img src={currentProduct.thumbnail} alt="view 2" />
                <img src={currentProduct.thumbnail} alt="view 3" />
                <img src={currentProduct.thumbnail} alt="view 4" />
              </div>
              <div className="main-image">
                <img src={currentProduct.thumbnail} />
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
                        index <= Math.round(currentProduct.rating)
                          ? "#FFAD33"
                          : "transparent"
                      }
                      color={
                        index <= Math.round(currentProduct.rating)
                          ? "#FFAD33"
                          : "#D1D1D1"
                      }
                    />
                  ))}
                </div>
                <span className="reviews">
                  {currentProduct.reviews.length} Reviews
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
                        cartDispatch({
                          type: "REMOVE_FROM_CART",
                          payload: currentProduct,
                        })
                      }
                    >
                      -
                    </button>
                    <div className="quantity-text">
                      {cart.find((item) => item.id === currentProduct.id)
                        ?.quantity || 0}
                    </div>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        cartDispatch({
                          type: "ADD_TO_CART",
                          payload: currentProduct,
                        })
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
                        ? cartDispatch({
                            type: "ADD_TO_CART",
                            payload: currentProduct,
                          })
                        : navigate("/login")
                    }
                  >
                    Add to Cart
                  </button>
                )}

                <button className="buy-now-btn">Buy Now</button>
                <button
                  className="wishlist-btn"
                  onClick={() =>
                    wishlistDispatch({
                      type: "TOGGLE",
                      payload: currentProduct,
                    })
                  }
                >
                  {wishlist.find((item) => item.id === currentProduct.id) ? (
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
            : relatedProduct.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
        </div>
      </div>
      <Support />
    </div>
  );
}

export default ProductDetail;
