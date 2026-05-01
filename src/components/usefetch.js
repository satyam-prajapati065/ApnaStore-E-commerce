import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setProducts(result.products || result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetcher();
  }, [url]);

  return { products, loading };
}
