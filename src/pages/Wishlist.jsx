import React, { useRef, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";
import WishlistCard from "../components/WishlistCard";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import ScrollLeftRight from "../components/ScrollLeftRight";
import useFetch from "../Custom Hooks/usefetch";

function Wishlist() {
  const relatedItems = useRef(null);
  const wishlists = useSelector((state) => state.wishlist.wishlistItems);
  const [page, setPage] = useState(1);
  const { products: relatedProducts, loading: relatedLoading } = useFetch(
    `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`,
  );

  const totalPages = 20;
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
              width: "100%",
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
          <ScrollLeftRight
            heading="Just For You"
            scrollRef={relatedItems}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
          <div className="cart-box1" ref={relatedItems}>
            {relatedLoading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
