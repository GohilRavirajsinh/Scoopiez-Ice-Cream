import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import reviewReducer from "./slices/reviewSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    reviews: reviewReducer,
    auth: authReducer,
  },
});
