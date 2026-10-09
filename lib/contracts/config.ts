import { botChainMainnet } from "./chain";
import { VAULT_ABI, MARKET_ABI } from "./abi";

export const VAULT_ADDRESS  = (process.env.NEXT_PUBLIC_VAULT_ADDRESS  || "0x32Ae204Fb204888e9Fa79CC2afD11cF398C8Eb2E") as `0x${string}`;
export const MARKET_ADDRESS = (process.env.NEXT_PUBLIC_MARKET_ADDRESS || "0x139f06D9F9374d714f786f65dB8791B6339a50A2") as `0x${string}`;
/** Latest ChallengeVault transaction on BOT Chain mainnet. */
export const LATEST_VAULT_RECEIPT =
  "0x3effd85ff325c89aadad124d80cb7d8419f3de59806280e397cd90516519eaa2" as const;
export const USDC_ADDRESS   = (process.env.NEXT_PUBLIC_USDC_ADDRESS   || "0x0000000000000000000000000000000000000000") as `0x${string}`;
export const CHAIN_ID       = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 677);

export const vaultContract = {
  address: VAULT_ADDRESS,
  abi:     VAULT_ABI,
  chain:   botChainMainnet,
} as const;

export const marketContract = {
  address: MARKET_ADDRESS,
  abi:     MARKET_ABI,
  chain:   botChainMainnet,
} as const;

/** Token enum mirrors Solidity: 0 = NATIVE, 1 = USDC */
export const TokenType = { NATIVE: 0, USDC: 1 } as const;
export type TokenType = (typeof TokenType)[keyof typeof TokenType];
