import { botChainMainnet } from "./chain";
import { VAULT_ABI, MARKET_ABI } from "./abi";

export const VAULT_ADDRESS  = (process.env.NEXT_PUBLIC_VAULT_ADDRESS  || "0x0000000000000000000000000000000000000000") as `0x${string}`;
export const MARKET_ADDRESS = (process.env.NEXT_PUBLIC_MARKET_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;
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
