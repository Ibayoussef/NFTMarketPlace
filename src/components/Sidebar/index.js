/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState, useEffect } from "react";
import trending from "../../assets/trending.svg";
import fresh from "../../assets/fresh.svg";
import fav from "../../assets/fav.svg";
import { useDispatch, useSelector } from "react-redux";
import { storeFilterStatus } from "../../reducers/web3Reducer";
import NFTMarketplace from "../../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../../data/abi/contracts/NFTMarketplace.sol/Address.json";
import { ethers } from "ethers";
const Wrapper = styled.div`
  .active {
    background: #1f607a;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: rgba(35, 31, 58, 0.77);
  height: 100vh;
  width: fit-content;
  padding: 49px 0px;
  gap: 23px;
  position: sticky;
  top: 0;
  left: 0;
  .link-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 13px;
    width: 100%;
    transition: all 0.4s;
    cursor: pointer;
    padding: 0px 49px;
    &:hover {
      background: #1f607a;
    }
    p {
      font-weight: 700;
      font-size: 1rem;
      line-height: 36px;
      width: 100%;
      text-transform: uppercase;
      color: #ffffff;

      text-shadow: 2px 2px 2px #7edbea;
    }
  }
  .category {
    font-weight: 700;
    font-size: 1rem;
    line-height: 36px;
    width: 100%;
    cursor: pointer;
    text-transform: uppercase;
    color: #ffffff;
    width: 100%;
    text-align: center;
    &:hover {
      background: #1f607a;
    }
    text-shadow: 2px 2px 2px #7edbea;
  }
`;

const links = [
  { name: "Trending", icon: trending },
  { name: "Favorites", icon: fav },
  { name: "Fresh", icon: fresh },
];

function Sidebar() {
  const { filterStatus, nfts, account } = useSelector((state) => state.web3);
  const [favFilter, setFavfilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const filterHandle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.address,
      NFTMarketplace,
      signer
    );

    const filter = await Promise.all(
      nfts.map(async (nft) => {
        const bool = await contract.callStatic.userLikedItem(
          nft.tokenId,
          account
        );
        if (bool) {
          return await nft;
        }
      })
    );

    setFavfilter(filter.filter((p) => p !== undefined));
  };
  useEffect(() => {
    filterHandle();
  }, [account]);
  useEffect(() => {
    const array = [];
    nfts.map((nft) => nft.tags.map((t) => array.push(t)));
    setCategories(array);
  }, [nfts]);
  return (
    <Wrapper>
      {links.map((link) => (
        <div
          key={link.name}
          onClick={() => {
            dispatch(
              storeFilterStatus({
                status: link.name.toLowerCase(),
                filter: favFilter,
              })
            );
          }}
          className={`link-container ${
            filterStatus === link.name.toLowerCase() ? "active" : ""
          }`}
        >
          <img src={link.icon} alt="icon" />
          <p>{link.name}</p>
        </div>
      ))}
      <p className="category">Categories</p>
      {categories.length > 0 &&
        categories.map((category) => (
          <p
            className={`category ${filterStatus === category ? "active" : ""}`}
            onClick={() => {
              dispatch(
                storeFilterStatus({
                  status: category,
                })
              );
            }}
            key={category}
          >
            {category}
          </p>
        ))}
    </Wrapper>
  );
}

export default Sidebar;
