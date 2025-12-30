import { create } from "zustand";
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}
export interface ProductStore {
  product: ProductItem[];   
  setProducts: (product: ProductItem[]) => void;
}
export const useProductStore = create<ProductStore>((set) => ({
  product: [],
  setProducts: (newProduct) => set({ product: newProduct }),
}));