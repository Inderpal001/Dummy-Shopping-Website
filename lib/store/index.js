import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

export const makeStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
