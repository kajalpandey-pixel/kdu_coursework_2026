import { useEffect, useMemo} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import "./ProductDetails.scss";
import { useProductContext } from "../../context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, fetchById, loading, error }=useProductContext();
  

  useEffect(() => {
    if (id) fetchById(id);
  }, [id]);

  const discountedPrice=useMemo(() => {
    if (!selectedProduct) return "";
    return selectedProduct.discountPercentage ? (selectedProduct.price*(1-selectedProduct.discountPercentage / 100)).toFixed(2): selectedProduct.price.toFixed(2);
  }, [selectedProduct]);

  if (loading) return <p className="status">Loading...</p>;
  if (error || !selectedProduct) return <p className="status error">{error}</p>;

  return (
    <div className="details">
      <button className="back" onClick={() => navigate("/")}>
        Back
      </button>

      <div className="content">
        <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />

        <div className="info">
          <h1>{selectedProduct.title}</h1>
          <p>{selectedProduct.description}</p>

          <p><b>Brand:</b> {selectedProduct.brand}</p>
          <p><b>Category:</b> {selectedProduct.category}</p>
          <p><b>Stock:</b> {selectedProduct.stock}</p>

          <Rating value={selectedProduct.rating} />

          <div className="price">
            {selectedProduct.discountPercentage > 0 && (
              <span className="old">${selectedProduct.price}</span>
            )}
            <span className="new">${discountedPrice}</span>
          </div>

          <div className="gallery">
            {selectedProduct.images.map((img) => (
              <img key={img} src={img} alt="product" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
