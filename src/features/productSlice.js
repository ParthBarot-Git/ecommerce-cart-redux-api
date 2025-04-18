import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialCartSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchProductData = createAsyncThunk("productSlice", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const responseData = await response.json();
    return responseData;
})

const productSlice = createSlice({
  name: "product",
  initialState: initialCartSlice,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

