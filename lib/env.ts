import { z } from "zod";

/**
 * Coerce empty strings to undefined so that `.optional()` fields work correctly
 * on Vercel where unconfigured env vars may be set to "" instead of absent.
 */
const emptyStringToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

const optionalString = z.preprocess(emptyStringToUndefined, z.string().min(1).optional());
const optionalUrl = z.preprocess(emptyStringToUndefined, z.string().url().optional());

const envSchema = z.object({
  AUTH_SECRET: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  AUTH_URL: optionalUrl,
  COMPOSIO_API_KEY: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  OPENAI_API_KEY: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // The main STFU & Execute Telegram supergroup/forum channel ID (negative number, e.g. -1001234567890).
  // Each challenge creates a new topic (thread) inside this channel.
  TELEGRAM_CHAT_ID: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  // Bot token from @BotFather. The bot must be an admin in TELEGRAM_CHAT_ID with topic management rights.
  TELEGRAM_BOT_TOKEN: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  NEXT_PUBLIC_PRIVY_APP_ID: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  PRIVY_APP_ID: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  PRIVY_APP_SECRET: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  DATABASE_URL: optionalUrl,
  DIRECT_URL: optionalUrl,

  // ── Smart contracts ────────────────────────────────────────────────────
  // Server-side oracle wallet that calls ChallengeVault.resolve()
  ORACLE_PRIVATE_KEY: optionalString,
  // Shared secret for the /api/contracts/ai-verdict endpoint
  ORACLE_WEBHOOK_SECRET: optionalString,
  // BOT Chain RPC (server-side; no NEXT_PUBLIC prefix for security)
  BOT_RPC_URL: optionalUrl,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 2));
  throw new Error("Invalid environment variables. Check the console for details.");
}

export const env = parsed.data;

