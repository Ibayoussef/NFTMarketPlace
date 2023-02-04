const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;
async function main() {
  const [deployer] = await ethers.getSigners();
  const MemeNation = await ethers.getContractFactory("MemeNation");
  const memenation = await MemeNation.deploy(500000000, 600000000);
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMarketplace.deploy(
    deployer.address,
    memenation.address
  );
  memenation
    .connect(deployer)
    .transfer(nftmarketplace.address, parseEther("5"));
  console.log("Contract deployed to address: " + nftmarketplace.address);
  console.log("Coin deployed to address: " + memenation.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
