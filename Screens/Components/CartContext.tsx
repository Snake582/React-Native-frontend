import React, { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  prix: number;
  image: string;
  taille?: string;
  quantity?: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number, taille?: string) => void;
  clearCart: () => void;
  updateQuantity: (id: number, delta: number, taille?: string) => void;
  setCart: (cart: Product[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.id === product.id && p.taille === product.taille
      );
      if (existing) {
        return prev.map((p) =>
          p.id === product.id && p.taille === product.taille
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, taille?: string) => {
    setCart((prev) =>
      prev.filter((p) => !(p.id === id && p.taille === taille))
    );
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (id: number, delta: number, taille?: string) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.taille === taille
          ? { ...p, quantity: Math.max(1, (p.quantity || 1) + delta) }
          : p
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
