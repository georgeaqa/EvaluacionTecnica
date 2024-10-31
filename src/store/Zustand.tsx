import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { User, Product, Order } from "../types/types";

interface Store {
  user: User | null;
  setUsuario: (user: User) => void;
  productsCart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set) => {
  return {
    user: null,
    setUsuario: (user: User) => set({ user }),
    productsCart: [],
    addProductToCart: (product: Product) =>
      set((state) => ({
        productsCart: [...state.productsCart, product],
      })),
    removeProductFromCart: (productId: number) =>
      set((state) => ({
        productsCart: state.productsCart.filter(
          (product) => product.id !== productId
        ),
      })),
    clearCart: () => set({ productsCart: [] }),
  };
});
