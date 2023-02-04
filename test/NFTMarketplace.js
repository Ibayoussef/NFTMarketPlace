const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;
describe("Deploy", function () {
  let owner,
    addr1,
    addr2,
    nftmarketplace,
    connectOwner,
    connectUser,
    connectUser2;
  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const MemeNation = await ethers.getContractFactory("MemeNation");
    const memenation = await MemeNation.deploy(500000000, 600000000);

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    nftmarketplace = await NFTMarketplace.deploy(
      owner.address,
      memenation.address
    );
    memenation.connect(owner).transfer(nftmarketplace.address, parseEther("5"));
    connectOwner = nftmarketplace.connect(owner);
    connectUser = nftmarketplace.connect(addr1);
    connectUser2 = nftmarketplace.connect(addr2);
  });
  it("Deployed", () =>
    console.log("Contract address: ", nftmarketplace.address));
  it("Owner can change free price", async () => {
    connectOwner.setFeePrice(parseEther("0.001"));
    expect(await nftmarketplace.callStatic.getFeePrice()).to.be.equal(
      parseEther("0.001")
    );
  });
  it("Getting current token id works", async () => {
    connectOwner.callStatic.getCurrentTokenID();
    expect(await connectOwner.callStatic.getCurrentTokenID()).to.be.equal(0);
  });
  it("User can create NFT and gets listed", async () => {
    expect(
      await connectUser.callStatic.createNFT("google.com", parseEther("0.01"), {
        value: parseEther("0.01"),
      })
    ).to.be.equal(1);
  });
  it("User can get all NFTS list", async () => {
    await connectUser.createNFT("google.com", parseEther("0.01"), {
      value: parseEther("0.01"),
    });

    let nfts = await connectUser.callStatic.getAllNFTs();
    expect(nfts.length).to.be.equal(1);
    await connectUser.createNFT("google.com", parseEther("0.01"), {
      value: parseEther("0.01"),
    });
    nfts = await connectUser.callStatic.getAllNFTs();
    expect(nfts.length).to.be.equal(2);
  });
  it("User can get only his own nfts", async () => {
    await connectUser.createNFT("google.com", parseEther("0.01"), {
      value: parseEther("0.01"),
    });

    await connectUser2.createNFT("googole.com", parseEther("0.01"), {
      value: parseEther("0.01"),
    });
    let nfts = await connectUser2.callStatic.getUserNFTS();

    expect(nfts.length).to.be.equal(1);
  });
  it("User can like nfts", async () => {
    await connectUser.createNFT("azea", parseEther("0.001"), {
      value: parseEther("0.01"),
    });
    let nfts = await connectUser2.getAllNFTs();

    await connectUser.addLikeToNft(nfts[0][0]);
    nfts = await connectUser2.getAllNFTs();
    let likes = nfts[0][4];
    expect(likes).to.be.equal(1);
  });
  it("User can excute sales", async () => {
    await connectUser.createNFT("azeazeaz", parseEther("1"), {
      value: parseEther("0.01"),
    });
    let transaction = await connectUser2.excuteSale(1, {
      value: parseEther("1"),
    });
    await transaction.wait();
  });
});
