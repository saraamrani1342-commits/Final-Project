import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://final-project-n18z.onrender.com/api/product';

// Get all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 10 } = {}) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  }
);

// Get product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    pagination: {},
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;

