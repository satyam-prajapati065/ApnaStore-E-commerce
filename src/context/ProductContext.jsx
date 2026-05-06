import React, { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=194",
          { signal },
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        setProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAllProducts();
    return () => controller.abort();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}
