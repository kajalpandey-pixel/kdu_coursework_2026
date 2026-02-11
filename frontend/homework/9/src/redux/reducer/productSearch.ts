import { useDispatch , useSelector} from 'react-redux';
import { searchProducts } from './path/to/productSlice'; // Import your thunk
import { AppDispatch } from './path/to/store'; // Import types

const ProductSearch = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchButtonClick = () => {
    // here dispatch opr are done 
    dispatch(searchProducts('your-query-here'));
  };

  return (
    <button onClick={handleSearchButtonClick}>
      Search Now
    </button>
  );
};