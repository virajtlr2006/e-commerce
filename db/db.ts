import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = global as unknown as { pool: Pool | undefined };

const pool = globalForDb.pool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Limit the number of concurrent connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // Fail after 10 seconds if no connection
});

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export const db = drizzle(pool);