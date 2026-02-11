import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/product";
import {fetchAllProducts, searchProductsAPi, fetchProductById} from "../api/products";

interface ProductContextType{
    products: Product[];
    selectedProduct: Product | null;
    searchQuery: string;
    loading: boolean;
    error: string | null;

    fetchProducts: () => void;
    searchProducts:(query: string)=>void;
    fetchById:(id: string)=>void;
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;

}

const ProductContext=createContext<ProductContextType | null>(null);

export const useProductContext = () => {
  const ctex=useContext(ProductContext);
  if (!ctex) throw new Error("useProductContext must be used inside Provider");
  return ctex;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async()=>{
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  const searchProducts =async(query: string)=>{
    try {
      setLoading(true);
      setError(null);
      const data=await searchProductsAPi(query);
      setProducts(data);
    }catch (err){
      setError("Failed to search the products");
    }finally {
      setLoading(false);
    }
  }

  const fetchById = async(id: string)=>{
    try {
      setLoading(true);
      setError(null);
      const data=await fetchProductById(id);
      setSelectedProduct(data);
    }catch (err){
      setError("failed to get by id");
    }finally{
      setLoading(false);
    }
  }
  const clearSearch = () => {
    setSearchQuery("");
    fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        searchQuery,
        loading,
        error,
        fetchProducts,
        searchProducts,
        fetchById,
        setSearchQuery,
        clearSearch,
      }}
      >
      {children}
    </ProductContext.Provider>
  );

};

