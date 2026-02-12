import { use, useEffect, useState } from 'react';
import type { Product, ProductResponse } from '../DataFormat';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const navigate = useNavigate();  

  function moveToDetailPage(productId: number) {
    // Implement navigation logic here, e.g., using React Router
     
      navigate('/details');
  }
  
  useEffect(() => {
    fetch('https://0dlnbf5uxh.execute-api.us-east-1.amazonaws.com/prod/products')
      .then((response) => response.json())
      .then((data: ProductResponse) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setCategory(event.target.textContent || '');
  }


useEffect(() => 
      {if (category)
             { const filtered = products.filter((product) => product.tag === category); 
                  setFilteredProducts(filtered); }
                  
      else 
            { setFilteredProducts(products); } 
     }, [category, products]);

 return (
    <>
      <nav>
        <input type="text" placeholder="Search" className="search-bar" />
      </nav>

      <div className="button-group">
        <button className="button" onClick={() => handleCategoryChange(event)}>
          Electronics
        </button>
        <button className="button" onClick={() => handleCategoryChange(event)}>
          Clothes
        </button>
        <button className="button" onClick={() => handleCategoryChange(event)}>
          Books
        </button>
        <button className="button" onClick={() => handleCategoryChange(event)}>
          Cosmetics
        </button>
      </div>

      <div> 
            // by clicking on a product, it should navigate to the detail page of that product

        {filteredProducts.map((product : Product) => (
          <div key={product.id} onClick={()=>moveToDetailPage(product.id)}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <small>{product.tag}</small>
          </div>
        ))}
      </div>
    </>
  );
}
