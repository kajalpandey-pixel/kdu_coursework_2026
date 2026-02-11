import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchProductsAPi } from '../../api/products';

// The thunk wrapper
export const searchProducts = createAsyncThunk(
  'products/search', 
  async (query: string, { rejectWithValue }) => {
    try {
      // Calling your existing API function
      const products = await searchProductsAPi(query);
      return products;
    } catch (error: any) {
      // Return a custom error message
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);



