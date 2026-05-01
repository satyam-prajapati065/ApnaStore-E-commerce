import { useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router";
import useFetch from "../components/usefetch";
import CategoryFilter from "../components/CategoryFilter";
import SkeletonCard from "../components/SkeletonCard";
import Support from "../components/Support";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useFetch(
    `https://dummyjson.com/products/category/${category}?limit=194`,
  );

  return (
    <div className="category-container">
      <CategoryFilter category={category} />
      <div className="related-items-box category-heading">
        <div className="rect"></div>
        <h3>{category.toUpperCase()}</h3>
      </div>

      <div className="categorized-products">
        {loading
          ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
          : products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
      </div>
      <button onClick={() => navigate("/")} className="back-to">
        Back to Home
      </button>
      <Support />
    </div>
  );
}

export default CategoryPage;
