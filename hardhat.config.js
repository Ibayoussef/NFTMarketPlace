require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PROJECT_ID, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  abiExporter: {
    path: "./data/abi",
    runOnCompile: true,
    spacing: 2,
    pretty: true,
  },
  tworks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
