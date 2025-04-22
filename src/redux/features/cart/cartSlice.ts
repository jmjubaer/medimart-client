import { RootState } from "@/redux/store";
import { IMedicine } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem extends IMedicine {
  quantity: number;
}

interface CartState {
  cartItems: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Initial state doesn't access localStorage (safe for SSR)
const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },

    addToCart: (state, action: PayloadAction<{ product: IMedicine; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice += product.price * quantity;

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item._id === productId);

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems.splice(itemIndex, 1);

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(item => item._id === action.payload);

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice = parseFloat((state.totalPrice - item.price).toFixed(2));
        } else {
          state.totalQuantity -= 1;
          state.totalPrice = parseFloat((state.totalPrice - item.price).toFixed(2));
          state.cartItems.splice(itemIndex, 1);
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export const useTotalPrice = (state: RootState) => state.cart.totalPrice;
export const useTotalQuantity = (state: RootState) => state.cart.totalQuantity;
export const useCartItems = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
