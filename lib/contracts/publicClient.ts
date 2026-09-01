"use client";

import { createPublicClient, http } from "viem";
import { botChainMainnet } from "./chain";

// Singleton read-only client — no wallet needed.
// Safe to import in both server and client components.
export const publicClient = createPublicClient({
  chain:     botChainMainnet,
  transport: http(process.env.NEXT_PUBLIC_BOT_RPC_URL || "https://rpc.botchain.ai"),
});
