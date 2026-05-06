import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../Custom Hooks/useDebounce";
import { ProductContext } from "../context/ProductContext";

function SearchingElements({ search, setSearch }) {
  const { products, loading } = useContext(ProductContext);
  const debouncedSearch = useDebounce(search, 400);

  const filteredProducts = React.useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    return products.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [products, debouncedSearch]);

  if (!search.trim()) return null;

  return (
    <div className="searching-container">
      {loading && <p style={{ padding: "1rem" }}>Searching...</p>}
      {!loading && filteredProducts.length === 0 && (
        <p style={{ padding: "1rem" }}>No products found.</p>
      )}
      {filteredProducts.map((item) => (
        <Link
          to={`/product/${item.id}`}
          className="serching-items only-link"
          key={item.id}
          onClick={() => setSearch("")}
        >
          <img src={item.thumbnail} alt={item.title} />
          <div className="titles-category">
            <span>{item.title}</span>
            <p style={{ color: "blue" }}>{item.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchingElements;
