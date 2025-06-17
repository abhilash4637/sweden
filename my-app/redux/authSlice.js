import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: typeof window !== 'undefined' && !!localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {    
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      const token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
