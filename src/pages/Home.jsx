import React, { useRef } from "react";
import ProductCard from "../components/ProductCard";
import useFetch from "../components/usefetch";
import CategoryFilter from "../components/CategoryFilter";
import SkeletonCard from "../components/SkeletonCard";
import ScrollLeftRight from "../components/ScrollLeftRight";
import Support from "../components/Support";

export default function Home() {
  const flashSaleRef = useRef(null);
  const bestSellingRef = useRef(null);

  const { products, loading } = useFetch(
    "https://dummyjson.com/products?limit=194",
  );
  const bestSelling = products
    .map((prev) => ({
      ...prev,
      score: prev.rating * 20 - prev.stock,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const onSale = products
    .filter((prev) => prev.discountPercentage > 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 10);

  return (
    <div className="home-page-container">
      <div className="cartSale">
        <ScrollLeftRight
          heading="Today's"
          title="Flash Sales"
          scrollRef={flashSaleRef}
          func={true}
        />
        <div className="cart-box1" ref={flashSaleRef}>
          {loading
            ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
            : onSale.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
        </div>
      </div>

      <CategoryFilter />

      <div className="cartSale">
        <ScrollLeftRight
          heading="This Month"
          title="Best Selling Products"
          scrollRef={bestSellingRef}
          func={false}
        />
        <div
          className="cart-box1"
          ref={bestSellingRef}
          style={{ marginTop: "20px" }}
        >
          {loading
            ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
            : bestSelling.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
        </div>
      </div>
      <Support />
    </div>
  );
}
