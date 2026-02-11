import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useProductContext } from "../../context/ProductContext";
import { useEffect, useState } from "react";

const Navbar=()=>{
  const {searchQuery, setSearchQuery, searchProducts, clearSearch, loading }=useProductContext();
  const [debouncedValue,setDebouncedValue]=useState(searchQuery);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setDebouncedValue(searchQuery);
    },500);
    return ()=>clearTimeout(timer);
  },[searchQuery]);

  useEffect(()=>{
    if(debouncedValue){
      searchProducts(debouncedValue);
    }
  },[debouncedValue]);


  return (
    <nav className="navbar">
      <h2>Product Discovery</h2>

      <NavLink
        to="/"
        className={({isActive})=>(isActive?"active":"")}
      >
        Home
      </NavLink>
      <div className="search">
        <input 
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          placeholder="Serach products...."
        />
        {searchQuery && (
          <button onClick={clearSearch}>clear</button>
        )}

        {loading && <span>Loading...</span>}
      </div>
    </nav>
  );
};

export default Navbar;
