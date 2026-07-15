import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");

  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);

    const updateCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
    setCart((prev) =>
      itemInCart ? updateCart : [...prev, { ...product, quantity }],
    );
  };

  const decreaseQuantity = (product) => {
    const updateCart = cart
      .map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);
    setCart(updateCart);
  };

  const getCartQuantity = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((acc, item) => acc + item.quantity * item.precio, 0);

  const clearCart = () => setCart([]);

  const getCurrentQuantity = (productId) => {
    const item = cart.find((item) => productId === item.id);
    return item ? item.quantity : 0;
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const value = {
    cart,
    addToCart,
    decreaseQuantity,
    getCurrentQuantity,
    getCartQuantity,
    getCartTotal,
    clearCart,
    removeItem,
  };

  return <CartContext value={value}>{children}</CartContext>;
};
