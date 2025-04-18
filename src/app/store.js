import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import cartItemReducer from "../features/cartItemSlice";

 const store = configureStore({ reducer: {
    product : productReducer,
    cartItem : cartItemReducer,
} });
export default store