import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../env";
import * as schema from "@/lib/db/schema";

// Disable prefetch as it is not supported for "Transaction" pool mode in Supabase
const connectionString = env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/postgres";
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
