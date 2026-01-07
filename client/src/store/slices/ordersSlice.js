import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://final-project-n18z.onrender.com/api/order';

// Get user orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (token) => {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

// Create order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ orderData, token }) => {
    const response = await axios.post(API_URL, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default ordersSlice.reducer;

