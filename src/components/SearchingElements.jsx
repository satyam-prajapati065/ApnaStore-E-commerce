import React from "react";
import useFetch from "./usefetch";
import { Link } from "react-router";

function SearchingElements({ search, setSearch }) {
  const { products } = useFetch("https://dummyjson.com/products?limit=194");
  const filteredProducts = React.useMemo(() => {
    if (!search.trim()) {
      return [];
    }
    return products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  return (
    <>
      {filteredProducts.length > 0 && (
        <div className="searching-container">
          {filteredProducts.map((item) => (
            <Link
              to={`/product/${item.id}`}
              className="serching-items only-link"
              key={item.title}
              onClick={() => setSearch("")}
            >
              <img src={item.thumbnail} alt="" />
              <div className="titles-category">
                <span>{item.title}</span>
                <p style={{ color: "blue" }}>{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchingElements;
