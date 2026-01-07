import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import usersReducer from './slices/usersSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
  },
});

