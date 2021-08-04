import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const product = state.items.find(item => item.id === action.payload.id)
      if (!product) {
        action.payload.quantity = 1
        state.items = [...state.items, action.payload]
      } else {
        product.quantity += 1
      }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Cant remove product as it's not in basket`)
      }
      state.items = newBasket
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => ({
  total: state.basket.items.reduce((total, item) => total + item.price * item.quantity, 0),
  itemAmount: state.basket.items.reduce((total, item) => total + item.quantity, 0)
})

export default basketSlice.reducer;
