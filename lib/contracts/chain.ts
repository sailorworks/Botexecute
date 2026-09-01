import { defineChain } from "viem";

export const botChainMainnet = defineChain({
  id: 677,
  name: "BOT Chain Mainnet",
  nativeCurrency: { name: "BOT", symbol: "BOT", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_BOT_RPC_URL || "https://rpc.botchain.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "BOTScan",
      url: "https://scan.botchain.ai",
    },
  },
  testnet: false,
});
