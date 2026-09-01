# BotExecute

> **Lock your stake on BOT Chain. Let AI track execution. Win or get liquidated.**

An AI-native on-chain accountability and prediction market protocol built on **BOT Chain** (Chain ID: 677).

---

## 🚀 Overview

**BotExecute** turns personal commitments into high-stakes on-chain challenges:
1. **Stake & Challenge**: Lock native BOT into the `ChallengeVault` contract.
2. **AI Accountability Agent**: Real-time progress monitoring via LLM and Telegram integration.
3. **Prediction Market**: Spectators bet PASS / FAIL on the challenger in `PredictionMarket`.
4. **On-Chain Settlement**: Sub-second deterministic settlement on BOT Chain upon AI/oracle verdict.

---

## ⚡ BOT Chain Mainnet Architecture

| Parameter | Specification |
| :--- | :--- |
| **Network Name** | BOT Chain Mainnet |
| **Chain ID** | `677` (`0x2a5`) |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Explorer** | `https://scan.botchain.ai` |
| **Native Token** | BOT (18 decimals) |
| **Block Time** | ~0.75 seconds |

---

## 📦 Smart Contracts

- **`ChallengeVault.sol`**: Holds user stakes in BOT. Resolves binary outcomes:
  - **Pass**: 100% of stake returned to challenger.
  - **Fail**: 5% protocol fee to treasury, 95% forwarded to `PredictionMarket` to reward winning FAIL bettors.
  - **Emergency Refund**: Safety valve after 30-day grace period past deadline.
- **`PredictionMarket.sol`**: P2P prediction pools for each challenge.

### Contract Addresses (BOT Chain Mainnet)
| Contract | Address |
| :--- | :--- |
| **ChallengeVault** | `TBD (Deploying)` |
| **PredictionMarket** | `TBD (Deploying)` |

---

## 🛠️ Tech Stack

- **L1 Blockchain**: BOT Chain Mainnet (Chain ID 677)
- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4, Framer Motion
- **Web3 / EVM**: Viem, Privy Auth (Embedded & EOA Wallets)
- **AI SDK**: Vercel AI SDK, OpenAI
- **Messaging**: Telegram Bot API
- **Contracts**: Solidity 0.8.24, Hardhat, OpenZeppelin v5

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
cd contracts && npm install && cd ..
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and fill in the required keys.

### 3. Deploy Contracts to BOT Chain
```bash
cd contracts
# Deploy to BOT Chain Testnet
npm run deploy:bot-testnet

# Deploy to BOT Chain Mainnet
npm run deploy:bot
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 📜 License
MIT
