import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useProductContext } from "../../context/ProductContext";

const TopNav = () => {
  const { searchQuery, setSearchQuery } = useProductContext();


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
      </div>
    </nav>
  );
};

export default TopNav;
