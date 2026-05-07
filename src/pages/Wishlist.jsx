import React, { useContext } from "react";
import SkeletonCard from "../components/SkeletonCard";
import WishlistCard from "../components/WishlistCard";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { useSelector } from "react-redux";

function Wishlist() {
  const wishlists = useSelector((state) => state.wishlist.wishlistItems);

  const { products: relatedProduct, loading } = useContext(ProductContext);
  return (
    <div className="wishlist-main-container">
      <nav className="breadcrumbs" style={{ padding: "1rem 0" }}>
        <Breadcrumbs />
      </nav>

      <div className="wishlist-container">
        <div className="related-items-container">
          <div className="related-items-box">
            <h3>My Wishlist ({wishlists.length})</h3>
          </div>
          <div
            className="cart-box1"
            style={{
              display: "flex",
              gap: "30px",
              width: "100%",
              overflow: "scroll hidden",
              height: "auto",
              padding: "1rem",
            }}
          >
            {wishlists.length === 0 ? (
              <p style={{ color: "grey", padding: "1rem" }}>
                Your wishlist is empty!
              </p>
            ) : (
              wishlists.map((item) => (
                <WishlistCard key={item.id} product={item} />
              ))
            )}
          </div>
        </div>

        <div className="related-items-container">
          <div className="related-items-box">
            <div className="rect"></div>
            <h3>Just For You</h3>
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
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : relatedProduct.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
