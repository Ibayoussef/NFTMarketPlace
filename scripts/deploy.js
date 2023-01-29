const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMarketplace.deploy(deployer.address);
  console.log("Contract deployed to address: " + nftmarketplace.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
