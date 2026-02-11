import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.scss";

const Home = () => {
  const { products, loading, error, fetchProducts } = useProductContext();
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (!products.length) return <p>No results found</p>;

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Home;
