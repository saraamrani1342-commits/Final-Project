import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://final-project-n18z.onrender.com/api/user';

// Register user
export const registerUser = createAsyncThunk(
  'users/register',
  async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'users/login',
  async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  }
);

// Get all users (admin only)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (token) => {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    token: localStorage.getItem('token') || null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { logout, setToken } = usersSlice.actions;
export default usersSlice.reducer;

