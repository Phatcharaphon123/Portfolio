import React, { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (foodId) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [foodId]: (prevItems[foodId] || 0) + 1,
    }));
  };

  const removeFromCart = (foodId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[foodId] > 1) {
        updatedItems[foodId] -= 1;
      } else {
        delete updatedItems[foodId];
      }
      return updatedItems;
    });
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, foodId) => {
      const item = food_list.find((food) => food._id === foodId);
      if (item) {
        total += cartItems[foodId] * item.price;
      }
      return total;
    }, 0);
  };

  const getGrandTotal = () => {
    const subtotal = getTotalCartAmount();
    const vat = subtotal * 0.07; // คำนวณ VAT 7%
    return subtotal + vat;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getGrandTotal,
        food_list,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
