'use server'

import { productTable } from "@/db/schema"
import { db } from ".."

export const FetchProductsAction = async () => {
    const all = await db.select().from(productTable)
    console.log(all)
}