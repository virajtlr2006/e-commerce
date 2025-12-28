import { create } from "zustand";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface CartStore {
    items: CartItem[],

    // To add item in Cart
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;

    clearCart: () => void;

    totalItems: () => number;
    totalPrice: () => number;
}

// set:Used to change the data
// get:Used to read the current data
export const useCartStore = create<CartStore>()((set, get) => ({

    // 📄List where the cart Stores its Products
    items: [],


    // ➕Add Items to Cart
    addItem: (item) => {

        //🇦🇬 Checks Whether the items exists in cart or not
        const existing = get().items.find((i) => i.id === item.id);

        // If exist Increase the quantity as per item.quantity
        if (existing) {
            set({
                items: get().items.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                ),
            });
            //   If new Item , set to the Cart
        } else {
            set({ items: [...get().items, item] });
        }
    },


    // ➖Remove Items from Cart
    removeItem: (id) => {
        // Updates cart after by showing all items expect the element whose id is matched
        set({
            items: get().items.filter((item) => item.id !== id),
        });
    },


    //🖊️ Update Items Quantity of Cart
    updateQuantity: (id, quantity) => {

        set({
            // If id is matched , update the new quantity
            items: get().items.map((item) =>
                item.id === id ? { ...item, quantity } : item)
        });
    },


    // Clear all the items in the Cart by making items[] empty
    clearCart : () => {set({items :[]})},


    // Total Cart Items
    totalItems : () =>
        // Counting starts from 0 and then start adding every items included in the cart
         get().items.reduce((sum,item) => sum + item.quantity , 0),


    // 💲Total Price of the Cart Items
    totalPrice : () =>
        get().items.reduce((sum,item) => sum + item.price* item.quantity,0)
}))
