import type { Product } from "../../types/product";
import { Link } from "react-router-dom";

import Rating from "../Rating/Rating";
import "./ProductCard.scss";
// import { useProductContext } from "../../context/ProductContext";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  // const {products,}= useProductContext()

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>
      <p className="brand">{product.brand}</p>

      <div className="price">
        ${product.price};
      </div>

      <Rating value={product.rating} />
    </Link>
  );
};

export default ProductCard;
