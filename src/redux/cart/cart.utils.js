/**
 * Utility function to either add new items to the cart, or increment the quantity if the item is already present in the cart.
 * @param {Object[]} cartItems - Array containing the current items in the cart
 * @param {Object} newItem
 * @returns {Object[]}
 */
export const addItemToCart = (cartItems, newItem) => {
  const existingCartItem = cartItems.find(item => item.id === newItem.id);

  if (existingCartItem) {
    return cartItems.map(item =>
      item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...newItem, quantity: 1 }];
};

/**
 * Utility function to either remove an item from the cart
 * @param {Object[]} cartItems - Array containing the current items in the cart
 * @param {Object} newItem
 * @returns {Object[]}
 */
export const removeItemFromCart = (cartItems, itemToRemove) => {
  const existingCartItem = cartItems.find(item => item.id === itemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== itemToRemove.id);
  } else {
    return cartItems.map(item =>
      item.id === itemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};
