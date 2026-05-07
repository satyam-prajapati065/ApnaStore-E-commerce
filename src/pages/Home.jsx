import React, { useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SkeletonCard from "../components/SkeletonCard";
import ScrollLeftRight from "../components/ScrollLeftRight";
import Support from "../components/Support";
import useFetch from "../Custom Hooks/usefetch";

export default function Home() {
  const flashSaleRef = useRef(null);
  const bestSellingRef = useRef(null);
  const [flashPage, setFlashPage] = useState(1);
  const [bestPage, setBestPage] = useState(1);
  const { products: flashProducts, loading: flashLoading } = useFetch(
    `https://dummyjson.com/products?limit=10&skip=${(flashPage - 1) * 10}`,
  );

  const { products: bestProducts, loading: bestLoading } = useFetch(
    `https://dummyjson.com/products?limit=10&skip=${(bestPage - 1) * 10}`,
  );

  const totalPages = 20;

  const onSale = flashProducts
    .filter((item) => item.discountPercentage > 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage);

  const bestSelling = bestProducts
    .map((item) => ({
      ...item,
      score: item.rating * 20 - item.stock,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="home-page-container">
      <div className="cartSale">
        <ScrollLeftRight
          heading="Today's"
          title="Flash Sales"
          scrollRef={flashSaleRef}
          page={flashPage}
          setPage={setFlashPage}
          totalPages={totalPages}
        />

        <div className="cart-box1" ref={flashSaleRef}>
          {flashLoading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
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
          page={bestPage}
          setPage={setBestPage}
          totalPages={totalPages}
        />

        <div
          className="cart-box1"
          ref={bestSellingRef}
          style={{ marginTop: "20px" }}
        >
          {bestLoading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : bestSelling.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
        </div>
      </div>

      <Support />
    </div>
  );
}
