'use server'

import { CartItem } from "@/app/store/cartStore";
import { db } from "@/db/db";
import { orderItemsTable, ordertable, productTable } from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";

export const CreateOrderAction = async (
    email: string,
    fullname: string,
    CartItems: CartItem[]
) => {

    // Stop if the user tries to checkout with nothing in their cart
    if (CartItems.length === 0) {
        throw new Error("Your Cart is Empty");
    }

    // 1️⃣ RE-FETCH PRODUCTS: We get the latest data from the database 
    // to make sure the prices and stock levels haven't changed since the user added them to cart.
    const dbProducts = await db
        .select()
        .from(productTable)
        .where(
            inArray(
                productTable.id,
                CartItems.map(item => Number(item.id)) // Convert IDs to numbers for the database
            )
        );

    // 2️⃣ VALIDATE STOCK: Loop through each item the user wants to buy 
    // and check if the warehouse (database) actually has enough in stock.
    for (const item of CartItems) {
        const product = dbProducts.find(
            p => p.id === Number(item.id)
        );

        if (!product || product.stock < item.quantity) {
            throw new Error(`Insufficient Stock for ${item.name}`);
        }
    }

    // 3️⃣ CALCULATE TOTAL: Add up the price of everything (Price x Quantity)
    const total = CartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // 4️⃣ CREATE MAIN ORDER: Save the high-level order info (who bought it and for how much) 
    // into the "orders" table.
    const [order] = await db
        .insert(ordertable)
        .values({ email, fullname, total })
        .returning();

  // 5️⃣ Create Order Item and reduce the stock
for (const item of CartItems) {
    // Save the record of the sale
    await db
        .insert(orderItemsTable)
        .values({
            orderId: order.id,
            productId: Number(item.id), // Ensure this is a number
            quantity: item.quantity,
            price: item.price,
        });

    // Reduce the stock in the products table
    await db
        .update(productTable)
        // FIX: Use sql`` to tell the DB to do the subtraction
        .set({ stock: sql`${productTable.stock} - ${item.quantity}` })
        .where(eq(productTable.id, Number(item.id)));
   }

    // Give back the finished order details to the frontend
    return order;
};