require("@nomicfoundation/hardhat-toolbox");
require("hardhat-abi-exporter");
require("dotenv").config();

const { PROJECT_ID, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  abiExporter: {
    path: "./src/data/abi",
    runOnCompile: true,
    spacing: 2,
    format: "json",
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
