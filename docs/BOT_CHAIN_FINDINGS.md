# BOT Chain Comprehensive Technical Findings & Ecosystem Guide

This document is an exhaustive, detailed reference of all research, technical parameters, developer documentation, unique primitives, smart contract architectures, and findings discovered regarding **BOT Chain** during research and project development.

---

## 1. Network Overview & Core Parameters

**BOT Chain** is a high-performance, 100% EVM-compatible Layer 1 blockchain specifically engineered for **AI-native applications**, **DePIN (Decentralized Physical Infrastructure Networks)**, and high-frequency, low-cost micro-transactions.

### 1.1 Network Specifications Table

| Parameter | Mainnet | Testnet |
| :--- | :--- | :--- |
| **Network Name** | BOT Chain Mainnet | BOT Chain Testnet |
| **Chain ID (Dec)** | `677` | `968` |
| **Chain ID (Hex)** | `0x2a5` | `0x3c8` |
| **RPC Endpoint** | `https://rpc.botchain.ai` | `https://rpc.bohr.life` |
| **Block Explorer** | `https://scan.botchain.ai` | `https://scan.bohr.life` |
| **Native Gas Token** | `BOT` | `tBOT` |
| **Token Decimals** | 18 | 18 |
| **Total Supply** | 150,000,000 BOT (150M) | 150,000,000 tBOT |
| **Average Block Time** | `~0.75 seconds` | `~0.75 - 1.0 seconds` |
| **Average Gas Fee** | `~$0.06` | Free (Faucet) |
| **JSON-RPC Compatibility** | Geth-compatible JSON-RPC 2.0 | Geth-compatible JSON-RPC 2.0 |
| **Smart Contract VM** | Ethereum Virtual Machine (EVM) | Ethereum Virtual Machine (EVM) |
| **Consensus / Staking** | Proof-of-Stake / Delegated Validator Staking | Testnet Validator Pool |

---

## 2. Official Ecosystem URLs & Developer Portals

- **Official Website**: [https://www.botchain.ai/](https://www.botchain.ai/)
- **Developer Documentation**: [https://dev-docs.botchain.ai/docs/Developers/quick-guide/](https://dev-docs.botchain.ai/docs/Developers/quick-guide/)
- **Mainnet Block Explorer (BOTScan)**: [https://scan.botchain.ai/](https://scan.botchain.ai/)
- **Testnet Block Explorer**: [https://scan.bohr.life/](https://scan.bohr.life/)
- **Official Bridge**: [https://bridge.botchain.ai/](https://bridge.botchain.ai/)
- **Official DEX (B DEX)**: [https://dex.botchain.ai/](https://dex.botchain.ai/) (Swap interface: `https://dex.botchain.ai/#/swap`)
- **Official Wallet (BO Wallet / BOT Wallet)**: [https://wallet.botchain.ai/](https://wallet.botchain.ai/) (Testnet: `https://wallet.bohr.life/`)
- **Testnet Faucet**: [https://faucet.botchain.ai/basic/](https://faucet.botchain.ai/basic/)
- **GitHub Organization**: [https://github.com/BOTChain-bot](https://github.com/BOTChain-bot)

---

## 3. Developer Tooling, Libraries & Compatibility

Because BOT Chain is 100% EVM-compatible, standard Ethereum developer tools work out of the box with zero modifications other than pointing to Chain ID `677` / RPC `https://rpc.botchain.ai`.

### 3.1 Smart Contract Tooling
- **Foundry**: Fully supported (`forge build`, `forge test`, `forge script`).
- **Hardhat**: Compatible with standard `@nomicfoundation/hardhat-toolbox`.
- **Remix IDE**: Injected Provider (MetaMask) or Custom RPC pointing to `https://rpc.botchain.ai`.
- **Solidity Versions**: Tested with `0.8.20`, `0.8.24`, and `0.8.28`.

### 3.2 Frontend & Web3 SDKs
- **ethers.js (v5 and v6)**: `new BrowserProvider(window.ethereum)` or `new JsonRpcProvider("https://rpc.botchain.ai")`.
- **viem / wagmi**: Define chain with `id: 677`, `name: "BOT Chain Mainnet"`, `nativeCurrency: { name: "BOT", symbol: "BOT", decimals: 18 }`, `rpcUrls: { default: { http: ["https://rpc.botchain.ai"] } }`.
- **web3.js**: Standard Web3 provider initialization.

### 3.3 Indexing & Data Infrastructure
- **The Graph**: Subgraphs can index events on BOT Chain.
- **Covalent**: API endpoints for indexed historical blocks and logs.
- **Custom Indexers**: Standard JSON-RPC eth_getLogs filter polling.

---

## 4. Unique Protocol Primitives on BOT Chain

### 4.1 EOA-Based Paymaster (Gasless Transactions for EOAs)
Unlike standard EIP-4337 which strictly requires Smart Contract Wallets (Account Abstraction), BOT Chain documentation details an **EOA-based Paymaster** architecture allowing traditional Externally Owned Accounts (MetaMask, BO Wallet) to send sponsored, zero-gas transactions.

#### How EOA Paymaster Operates:
1. **Transaction Preparation**: The user's wallet prepares a transaction and sets the `gasPrice` to `0`.
2. **Eligibility Check (`pm_isSponsorable`)**:
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "pm_isSponsorable",
     "params": [
       {
         "to": "0xTargetContractAddress",
         "from": "0xUserEOAAddress",
         "value": "0x0",
         "data": "0xContractCalldata",
         "gas": "0x5208"
       }
     ]
   }
   ```
   **Response**:
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": {
       "Sponsorable": true,
       "SponsorPolicy": "Daily_DApp_Gas_Sponsorship"
     }
   }
   ```
3. **Transaction Signing**: User signs the zero-gas transaction with their EOA private key.
4. **Paymaster Submission (`eth_sendRawTransaction`)**: Raw transaction is submitted to the Paymaster service.
5. **MEV Builder Bundling**: The Paymaster creates a sponsor transaction with higher gas fees and combines the user's tx and sponsor tx into an atomic bundle.
6. **Block Inclusion**: MEV builders prioritize the bundle based on aggregated gas. Proposers/validators include the bundle in the next block (~0.75s).
7. **Infrastructure Provider**: MegaFuel powered by NodeReal (`https://docs.nodereal.io/docs/megafuel-overview`).

### 4.2 RWA (Real World Assets) & ONCHAINID Gateway
BOT Chain features native and pre-deployed RWA infrastructure on mainnet and testnet, including:
- **Token Contract**: Standardized security / compliance token representation.
- **IdentityRegistry**: On-chain identity verification and whitelisting.
- **ONCHAINID Gateway**: Integration for verified compliance credentials.

### 4.3 Blob API & Data Availability
- Native blob transaction support for rollups and DePIN data feeds requiring large, transient data payloads without expensive smart contract storage costs.

---

## 5. Wallet Configuration & Auto-Switch Recipe

### EIP-3085 & EIP-3326 Configuration Snippet (ethers.js v6)

```typescript
export const BOT_CHAIN_CONFIG = {
  chainId: "0x2a5", // 677 in hex
  chainName: "BOT Chain Mainnet",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.botchain.ai"],
  blockExplorerUrls: ["https://scan.botchain.ai"],
};

export async function switchOrAddBotChain() {
  if (!window.ethereum) throw new Error("No EVM wallet detected");

  try {
    // Try switching to BOT Chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BOT_CHAIN_CONFIG.chainId }],
    });
  } catch (error: any) {
    // Error 4902 means the chain has not been added to the wallet yet
    if (error.code === 4902 || error.message?.includes("Unrecognized chain ID")) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [BOT_CHAIN_CONFIG],
      });
    } else {
      throw error;
    }
  }
}
```

---

## 6. Applications Built & Architectural Paradigms

During research and development, two high-value on-chain application architectures were designed and developed for BOT Chain:

### 6.1 BOTRage — Decentralized Compute Portal (DePIN Provider)
*Targeting BOT Chain's high throughput and DePIN positioning.*

- **Concept**: Users monetize idle hardware (CPU concurrency, RAM, WebGL GPU) by provisioning sandboxed compute nodes that stream micro-rewards.
- **Smart Contracts Layer**:
  - `NodeRegistry.sol`: Registers nodes on-chain with CPU cores, RAM GB, GPU model, storage allocation, and active status.
  - `RewardPool.sol`: Streaming reward treasury that disburses `0.0001 BOT / sec` per active compute node.
- **Frontend Stack**:
  - Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion.
  - `BotChainProvider.tsx`: Custom EVM context managing network auto-switching, live balance queries, and contract dispatching.
  - Telemetry Dashboard: Real-time daemon event stream, CPU/RAM/VRAM gauges, live streaming yield incrementer, and direct links to BOTScan.

### 6.2 BOT AgentPay — Autonomous AI Agent Programmable Payment Protocol
*Targeting BOT Chain's AI-native identity and sub-cent fees.*

- **Concept**: Giving autonomous AI agents dedicated on-chain spending accounts with strict guardrails (per-transaction caps, daily budgets, expiry, service provider whitelists) rather than giving them raw private keys with unlimited balances.
- **Core Contracts**:
  1. `AgentRegistry.sol`: Registers AI agents, their operational signers, and metadata URIs.
  2. `ServiceRegistry.sol`: Registers verified service providers (LLM Inference, DePIN Compute, Web Search APIs, Vector DBs, IPFS Storage) with pricing rates in BOT.
  3. `AgentBudget.sol`: Treasury locking BOT deposits per agent, enforcing per-tx limits, daily spend velocity, and allowed service filters.
  4. `AgentPayment.sol`: The execution hub where agents invoke payments with automatic guardrail validation and emit `PaymentSettled` events for BOTScan indexing.

---

## 7. Smart Contract Deployment & Verification on BOT Chain

### 7.1 Foundry Configuration (`foundry.toml`)
```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc = "0.8.24"
optimizer = true
optimizer_runs = 200

[rpc_endpoints]
bot_mainnet = "https://rpc.botchain.ai"
bot_testnet = "https://rpc.bohr.life"
```

### 7.2 Mainnet Deployment Command
```bash
forge script script/Deploy.s.sol \
  --rpc-url https://rpc.botchain.ai \
  --broadcast \
  --verify
```

---

## 8. Summary of Strategic Advantages for Building on BOT Chain

1. **AI & DePIN Native Positioning**: Tailored for machine-to-machine, micro-payment, and telemetry data settlement.
2. **Predictable Low Fees**: Average transaction fee of ~$0.06 prevents gas spikes from breaking automated agent workflows or high-frequency node reward streams.
3. **Sub-Second Finality**: ~0.75s block time provides near real-time payment confirmation without needing Layer 2 rollup bridges.
4. **Zero-Migration Overhead**: Standard Solidity, Foundry, and ethers.js tooling enables instant porting of any existing EVM dApp.
5. **Native EOA Paymaster Support**: Enables dApps to sponsor gas for users without forcing them into complex smart contract wallet onboarding.
