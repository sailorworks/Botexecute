# Agent Handoff Document: BotExecute (BOT Chain Mainnet)

**Date**: 2026-09-01  
**Project**: BotExecute (AI-native Accountability Protocol on BOT Chain)  
**Previous Context**: Migrated from `stfuandexecute` (Monad Testnet) to `BotExecute` (BOT Chain Mainnet)

---

## 📌 Executive Summary

This session accomplished the full migration of the Web3 AI accountability platform from Monad Testnet to **BOT Chain Mainnet (Chain ID: 677)** into a brand-new standalone project directory **`BotExecute`**, leaving `stfuandexecute` completely untouched.

All smart contracts have been compiled and verified with automated unit tests (4/4 passing), the frontend design system has been restyled with BOT Chain's teal/green branding, and a clean Git repository was initialized.

---

## 🗂️ Workspace & Repositories

| Project | Path | Status |
| :--- | :--- | :--- |
| **stfuandexecute** (Original) | `/Users/sahilprasad/Desktop/bot_chain/stfuandexecute` | **Untouched** (Clean `main` branch) |
| **BotExecute** (New) | `/Users/sahilprasad/Desktop/bot_chain/BotExecute` | **Ready for deployment** (Initial commit on `main`) |

---

## ⚡ BOT Chain Network Parameters

| Parameter | Mainnet | Testnet |
| :--- | :--- | :--- |
| **Chain ID** | `677` (`0x2a5`) | `968` (`0x3c8`) |
| **RPC URL** | `https://rpc.botchain.ai` | `https://rpc.bohr.life` |
| **Block Explorer** | [BOTScan](https://scan.botchain.ai) | [Testnet Explorer](https://scan.bohr.life) |
| **Native Gas Token** | `BOT` (18 decimals) | `tBOT` (18 decimals) |
| **Avg Block Time** | `~0.75s` | `~0.75s` |
| **Official Bridge** | https://bridge.botchain.ai/ | - |
| **Official DEX** | https://dex.botchain.ai/ | - |
| **Testnet Faucet** | https://faucet.botchain.ai/basic/ | https://faucet.botchain.ai/basic/ |

---

## 🛠️ Work Completed in `BotExecute`

1. **Smart Contracts (`contracts/`)**:
   - `contracts/hardhat.config.js`: Configured for `botMainnet` (677) and `botTestnet` (968).
   - `contracts/scripts/deploy.js`: Mainnet deployment script with predicted addresses and mutual referencing.
   - `contracts/test/ChallengeSystem.test.js`: All tests converted to CommonJS, updated for BOT token, **4/4 passing**.
   - Contract artifacts: Compiled with Solidity 0.8.24.

2. **Frontend & EVM Layer (`lib/contracts/`)**:
   - `lib/contracts/chain.ts`: `botChainMainnet` defined (Chain ID 677, RPC, BOTScan).
   - `lib/contracts/config.ts`: Configured with BOT Chain mainnet contract bindings.
   - `lib/contracts/publicClient.ts` & `oracleWallet.ts`: Viem clients configured for BOT Chain.
   - `lib/contracts/useWalletClient.ts`: Automatic chain switching to Chain ID 677.
   - `lib/env.ts`: `BOT_RPC_URL` validation.

3. **UI / Styling & Branding**:
   - `app/globals.css`: Color variables updated to BOT Chain teal palette (`#14DCAC`, `#094228`, `#1CD8B0`).
   - `app/components/Nav.tsx`, `app/page.tsx`, `app/mission/page.tsx`, `app/arena/ArenaFeed.tsx`, `app/components/StakeModal.tsx`, `app/components/ChallengeStatusBanner.tsx`, `app/components/PredictionPanel.tsx`: Replaced all `MON` / `Monad` strings with `BOT` and updated explorer URLs to BOTScan.

4. **Repository & Configs**:
   - `README.md`: Rewritten for BotExecute on BOT Chain.
   - `.env.example`: Template for all required API keys, Supabase DB, Telegram bot, and BOT Chain contract addresses.
   - Git repository initialized on `main` (`commit b0f6b38`).

5. **Skills Installed**:
   - `handoff` skill (`mattpocock/skills`) installed in `.agents/skills/handoff/` and `~/.gemini/config/skills/handoff/`.

---

## 🎯 Next Steps for the Next Agent

1. **Deploy Contracts**:
   - For testnet validation:
     ```bash
     cd /Users/sahilprasad/Desktop/bot_chain/BotExecute/contracts
     npm run deploy:bot-testnet
     ```
   - For mainnet deployment (requires funded deployer key with BOT):
     ```bash
     cd /Users/sahilprasad/Desktop/bot_chain/BotExecute/contracts
     npm run deploy:bot
     ```
2. **Update Environment Variables**:
   - Copy `.env.example` to `.env.local` in `BotExecute` and fill in:
     - `NEXT_PUBLIC_VAULT_ADDRESS`
     - `NEXT_PUBLIC_MARKET_ADDRESS`
     - `DEPLOYER_PRIVATE_KEY` / `ORACLE_PRIVATE_KEY`
     - Supabase and Privy keys
3. **Start Local Development**:
   ```bash
   cd /Users/sahilprasad/Desktop/bot_chain/BotExecute
   npm run dev
   ```
4. **Push to Remote GitHub Repository**:
   ```bash
   cd /Users/sahilprasad/Desktop/bot_chain/BotExecute
   git remote add origin https://github.com/<user>/BotExecute.git
   git push -u origin main
   ```

---

## 💡 Suggested Skills

- **`agy-customizations`**: Reference when configuring workspace or global agent skills/rules.
- **`antigravity-guide`**: Reference for IDE keybindings, slash commands, or task runners.
