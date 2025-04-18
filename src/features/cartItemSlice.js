import { createSlice } from "@reduxjs/toolkit";

const totalProductPrice = (items) => {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};





const cartItem = createSlice({
  name: "cartItem",
  initialState: {
    cartItems: [],
    products:[],
    totalQuantity: 0,
    totalPrice: 0,
    searchProduct: "",
    filteredProducts: [],
    sortProduct: "asc",
  },
  reducers: { 

    addCartItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          title: newItem.title,
          description: newItem.description,
          quantity: 1,
          image: newItem.image,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalPrice = totalProductPrice(state.cartItems);
      
    },

    removeCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((items) => items.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((items) => items.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalPrice = totalProductPrice(state.cartItems);
      

    },

    incrementCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((items) => items.id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        existingItem.totalPrice += existingItem.price;
      }
      state.totalPrice = totalProductPrice(state.cartItems);
    },

    decreaseCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((items) => items.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalQuantity--;
          existingItem.totalPrice -= existingItem.price;
        } else {
          state.cartItems = state.cartItems.filter((items) => items.id !== id);
          state.totalQuantity--;
        }
      }
      state.totalPrice = totalProductPrice(state.cartItems);
    },
    setProducts(state, action){
        state.products = action.payload;
        state.filteredProducts = action.payload
    },
    sortingProducts(state, action) {
      state.sortProduct = action.payload;
      let sortedProducts = [...state.filteredProducts]; // Create a copy of the filtered products

      if (action.payload === "asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (action.payload === "dsc") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      state.filteredProducts = sortedProducts; // Set the sorted array as the new filteredProducts
    },

    searchProductsItem(state, action) {
      state.searchProduct = action.payload;
      state.filteredProducts = state.products.filter((items) =>
        items.title.toLowerCase().includes(action.payload.toLowerCase())
      ); // No mutation here, just creating a new filteredProducts array
    },
  },
});

export default cartItem.reducer;
export const cartItemActions = cartItem.actions;
