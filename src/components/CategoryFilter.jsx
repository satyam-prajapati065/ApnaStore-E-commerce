import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import useFetch from "./usefetch";
import ScrollLeftRight from "./ScrollLeftRight";

function CategoryFilter({ category }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const { products: categories } = useFetch(
    "https://dummyjson.com/products/categories",
  );
  useEffect(() => {
    if (category && scrollRef.current) {
      const activeElement = scrollRef.current.querySelector(
        ".category-boxes.active",
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [category, categories]);
  return (
    <div className="related-items-container" style={{ marginTop: "3rem" }}>
      <ScrollLeftRight
        scrollRef={scrollRef}
        heading="Categories"
        title="Browse by Category"
      />
      <div className="category-box-container" ref={scrollRef}>
        {categories.map((cate) => (
          <div
            key={cate.slug}
            className={`category-boxes ${category === cate.slug ? "active" : ""}`}
            onClick={() => navigate(`/category/${cate.slug}`)}
          >
            {cate.icons}
            <span>{cate.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
