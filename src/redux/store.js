


import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import cartReducer from './features/cart'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer
  },
});
