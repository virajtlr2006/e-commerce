import { Product } from "@/db/schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // 1. Import

export interface ProductStore {
  product: Product[];   
  setProducts: (product: Product[]) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: [],
      setProducts: (newProduct) => set({ product: newProduct }),
    }),
    {
      name: "product-cache", // Unique name for local storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);