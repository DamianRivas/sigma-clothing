import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_VISIBILITY,
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});
