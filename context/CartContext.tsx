"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // Funciones para controlar el Drawer
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const timeout = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 300);

    return () => clearTimeout(timeout);
  }, [cart, hydrated]);

  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantityToAdd }
            : p
        );
      }

      return [...prev, { ...product, quantity: quantityToAdd }];
    });
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.quantity < (item.stock || 999)) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const getSubtotalItem = (item) => {
    return item.price * item.quantity;
  };

  const cartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        hydrated,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        subtotal,
        getSubtotalItem,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);