import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // 1. Import middleware

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string | null;
    stock: number;
}

export interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

// 2. Wrap your store creator with persist()
export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const existing = get().items.find((i) => i.id === item.id);
                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, item] });
                }
            },

            removeItem: (id: number) => {
                set({
                    items: get().items.filter((item) => item.id !== id),
                });
            },

            updateQuantity: (id, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => {
                set({ items: [] });
            },

            totalItems: () =>
                get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        {
            name: "cart-storage", // 3. Unique name for the item in localStorage
            storage: createJSONStorage(() => localStorage), // 4. (Optional) Defaults to localStorage
        }
    )
);