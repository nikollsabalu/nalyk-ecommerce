"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // DRAWER
  // =========================

  const openCart = () => setIsCartOpen(true);

  const closeCart = () => setIsCartOpen(false);

  // =========================
  // OBTENER VARIANTE DESDE SUPABASE
  // =========================

  const fetchVariantData = async (
    variantId: string
  ) => {
    try {

      const { data, error } =
        await supabase
          .from("product_variants")
          .select(`
          id,
          price,
          stock
        `)
          .eq("id", variantId)
          .single();

      if (error) {
        console.error(error);
        return null;
      }

      return {
        id: data.id,

        // IMPORTANTE
        // convertir numeric/string -> number

        price: Number(data.price),

        stock: Number(data.stock),
      };

    } catch (error) {

      console.error(error);

      return null;
    }
  };

  // =========================
  // HIDRATAR CARRITO
  // =========================

  useEffect(() => {
    const loadCart = async () => {
      try {
        const saved =
          localStorage.getItem("cart");

        if (!saved) {
          setHydrated(true);
          return;
        }

        const parsedCart = JSON.parse(saved);

        // sincronizar con BD
        const updatedCart = await Promise.all(
          parsedCart.map(async (item) => {
            const variantDB =
              await fetchVariantData(
                item.variantId
              );

            // si variante no existe
            if (!variantDB) return null;

            return {
              ...item,
              stock: variantDB.stock,
              price: variantDB.price,
              quantity:
                item.quantity >
                  variantDB.stock
                  ? variantDB.stock
                  : item.quantity,
            };
          })
        );

        // eliminar null
        const cleanCart =
          updatedCart.filter(Boolean);

        setCart(cleanCart);
      } catch (error) {
        console.error(error);
      } finally {
        setHydrated(true);
      }
    };

    loadCart();
  }, []);

  // =========================
  // GUARDAR EN LOCALSTORAGE
  // =========================

  useEffect(() => {
    if (!hydrated) return;

    const timeout = setTimeout(() => {
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [cart, hydrated]);

  // =========================
  // AGREGAR AL CARRITO
  // =========================

  const addToCart = async (
    product,
    quantityToAdd = 1
  ) => {
    setIsLoading(true);



    try {
      // VALIDAR VARIANT ID
      if (!product.variantId) {
        console.error(
          "variantId no existe"
        );
        return;
      }

      const variantDB =
        await fetchVariantData(
          product.variantId
        );

      if (!variantDB) {
        console.error(
          "No se encontró la variante"
        );
        return;
      }

      setCart((prev) => {
        // buscar por variante
        const exists = prev.find(
          (p) =>
            p.variantId ===
            product.variantId
        );

        // SI YA EXISTE
        if (exists) {
          return prev.map((p) => {
            if (
              p.variantId ===
              product.variantId
            ) {
              const newQty =
                p.quantity +
                quantityToAdd;

              return {
                ...p,
                quantity:
                  newQty >
                    variantDB.stock
                    ? variantDB.stock
                    : newQty,
                stock: variantDB.stock,
                price: variantDB.price,
              };
            }

            return p;
          });
        }

        // NUEVO ITEM
        return [
          ...prev,
          {
            ...product,

            quantity:
              quantityToAdd >
                variantDB.stock
                ? variantDB.stock
                : quantityToAdd,

            stock: variantDB.stock,

            price: variantDB.price,
          },
        ];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // =========================
  // AUMENTAR CANTIDAD
  // =========================

  const increaseQty = async (
    variantId: string
  ) => {
    setIsLoading(true);

    try {
      const variantDB =
        await fetchVariantData(
          variantId
        );

      if (!variantDB) return;

      setCart((prev) =>
        prev.map((item) => {
          if (
            item.variantId ===
            variantId
          ) {
            // validar stock actualizado
            if (
              item.quantity >=
              variantDB.stock
            ) {
              return {
                ...item,
                stock: variantDB.stock,
                price: variantDB.price,
              };
            }

            return {
              ...item,
              quantity:
                item.quantity + 1,
              stock: variantDB.stock,
              price: variantDB.price,
            };
          }

          return item;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // DISMINUIR CANTIDAD
  // =========================

  const decreaseQty = async (
    variantId: string
  ) => {
    setIsLoading(true);

    try {
      const variantDB =
        await fetchVariantData(
          variantId
        );

      if (!variantDB) return;

      setCart((prev) =>
        prev.map((item) => {
          if (
            item.variantId ===
            variantId &&
            item.quantity > 1
          ) {
            return {
              ...item,
              quantity:
                item.quantity - 1,
              stock: variantDB.stock,
              price: variantDB.price,
            };
          }

          return item;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // ELIMINAR ITEM
  // =========================

  const removeItem = (
    variantId: number
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          item.variantId !== variantId
      )
    );
  };

  // =========================
  // TOTALES
  // =========================

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const getSubtotalItem = (item) => {
    return item.price * item.quantity;
  };

  const cartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // =========================
  // PROVIDER
  // =========================

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
        setIsLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);