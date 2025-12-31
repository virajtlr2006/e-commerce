import {
  pgTable,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { Interface } from "readline";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  price: integer().notNull(),
  image: varchar().default(""),
  stock: integer().notNull(),
  description: varchar(),
  category: varchar(),
  createdAt: timestamp().defaultNow(),
});

export const ordertable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar().notNull(),
  fullname: varchar().notNull(),
  total: integer().notNull(),
  createdAt: timestamp().defaultNow(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer().notNull(), //as a foreign key from orderTable
  productId: integer().notNull(),//foreign key from productTable
  quantity: integer().notNull(),
  price: integer().notNull(),
});

export type Product =  typeof productTable.$inferSelect