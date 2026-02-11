import { createSlice } from "@reduxjs/toolkit"   ;
import type { ProductsState } from "../states/ProductState";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchProductsAPi } from '../../api/products';

// The thunk wrapper
export const searchProducts = createAsyncThunk(
  'products/search', 
  async (query: string, { rejectWithValue }) => {
    try {
      // Calling  existing API function   
      const products = await searchProductsAPi(query);
      return products;
    } catch (error: any) {
      // Return a custom error message
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);




const initialState : ProductsState = {
    items : [] ,
}

const productSlice = createSlice({
  name: 'products',
  initialState : initialState ,
  reducers: {
         
  },
})

export default productSlice.reducer