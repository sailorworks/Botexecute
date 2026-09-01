require("@nomicfoundation/hardhat-toolbox");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x" + "0".repeat(64);

/** @type import("hardhat/config").HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            viaIR: true,
        },
    },
    networks: {
        botMainnet: {
            url: "https://rpc.botchain.ai",
            chainId: 677,
            accounts: [DEPLOYER_PRIVATE_KEY],
        },
        botTestnet: {
            url: "https://rpc.bohr.life",
            chainId: 968,
            accounts: [DEPLOYER_PRIVATE_KEY],
        },
    },
};
