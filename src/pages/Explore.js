import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTMarketplace from "../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../data/abi/contracts/NFTMarketplace.sol/Address.json";
import NFT from "../components/NFT";
import axios from "axios";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 70%;
`;
const NFTS = styled.div`
  position: relative;
  gap: 30px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

function Explore() {
  const [nfts, setNFTS] = useState([]);
  const [like, setLike] = useState(false);
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
      let transaction = await contract.getAllNFTs();

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
              tags: meta.tag,
            };
            return item;
          }
        })
      );
      console.log(items.filter((p) => p));
      setNFTS(items.filter((p) => p));
    };
    getNFTs();
  }, [like]);
  return (
    <Wrapper>
      <Sidebar />
      <NFTS>
        {nfts.map((nft) => (
          <NFT key={nft.tokenId} item={nft} setLike={setLike} like={like} />
        ))}
      </NFTS>
    </Wrapper>
  );
}

export default Explore;
