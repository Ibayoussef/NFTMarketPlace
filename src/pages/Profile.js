import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NFTMarketplace from "../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../data/abi/contracts/NFTMarketplace.sol/Address.json";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NFT from "../components/NFT";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  .grid {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    flex-wrap: wrap;
    height: 100vh;
  }
  .creationtitle {
    font-weight: 700;
    font-size: 2rem;
    line-height: 108%;
    letter-spacing: 0.17em;
    color: #ffffff;
    text-shadow: 2px 2px 2px #7edbea;
  }
  .button {
    background: #b33e92;
    box-shadow: 2px 2px 2px #b33e92;
    border-radius: 39px;
    padding: 10px 26px;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: white;
    transition: all 0.4s;
    cursor: pointer;
    text-shadow: 2px 2px 2px #7edbea;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 2px 1px 2px #b33e92;
    }
    &:active {
      transform: translateY(-1px);
      box-shadow: 2px 1.5px 2px #b33e92;
    }
  }
`;

function Profile() {
  const [nfts, setNFTS] = useState([]);
  const { account } = useSelector((state) => state.web3);
  const navigate = useNavigate();
  useEffect(() => {
    const getNFTs = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        Address.address,
        NFTMarketplace,
        signer
      );
      let transaction = await contract.connect(signer).getUserNFTS();

      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(
        transaction.map(async (i) => {
          console.log(await contract.tokenURI(i.tokenId));
          const tokenURI = await contract.tokenURI(i.tokenId);

          if (tokenURI) {
            let meta = await axios.get(tokenURI);
            meta = meta.data;
            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              likes: i.likes.toNumber(),
              image: meta.image,
              name: meta.name,
              description: meta.description,
            };
            return item;
          }
        })
      );
      console.log(items.filter((p) => p));
      setNFTS(items.filter((p) => p));
    };
    getNFTs();
  }, [account]);
  return (
    <Wrapper>
      <button className="button" onClick={() => navigate("/create")}>
        CREATE AN NFT
      </button>
      <div className="grid">
        {nfts.length === 0 && (
          <h1 className="creationtitle">
            Create Your First NFT Meme Right Now!
          </h1>
        )}
        {nfts.length !== 0 &&
          nfts.map((nft) => <NFT key={nft.tokenId} item={nft} />)}
      </div>
    </Wrapper>
  );
}

export default Profile;
