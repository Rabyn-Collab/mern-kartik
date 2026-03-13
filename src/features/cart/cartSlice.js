import { createSlice } from "@reduxjs/toolkit";
import { clearCartFromLocal, getCartFromLocal, setCartToLocal } from "../local/local.js";


export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: getCartFromLocal(),
  },
  reducers: {
    setCart: (state, action) => {

      // find if product is already exist
      const isExist = state.cart.find(item => item.id === action.payload.id);

      if (isExist) {
        // update huncha
        state.cart = state.cart.map(item => item.id === action.payload.id ? action.payload : item);
        setCartToLocal(state.cart);
      } else {

        //naya add huncha
        state.cart.push(action.payload);
        setCartToLocal(state.cart);
      }

    },
    clearCart: (state, action) => {
      state.cart = [];
      clearCartFromLocal();
    },
  },
});


export const { setCart, clearCart } = cartSlice.actions;