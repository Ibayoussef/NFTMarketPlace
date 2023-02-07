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
  background: #111;
  height: 100vh;
  transition: all 0.4s;

  @media (max-width: 900px) {
    width: ${(props) => (props.open ? "50%" : "0%")} !important;
    .collapse {
      position: fixed;

      top: 63px;
      left: 10px;
      width: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 20px;
      gap: 4px;

      z-index: 9999999;
      .line {
        position: relative;
        z-index: 9999999;
        height: 3px;
        width: 100%;
        background: #7f16e3;
      }
    }
  }
  overflow: auto;
  @media (max-width: 900px) {
    width: 210px;
    padding-top: 70px;
    overflow: auto;
  }
  width: fit-content;
  padding: 49px 0px;
  gap: 23px;
  position: sticky;
  top: 0;
  left: 0;
  .link-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 13px;
    width: 100%;
    transition: all 0.4s;
    cursor: pointer;
    padding: 0px 20px;
    &:hover {
      background: #1f607a;
    }
    img {
      width: 18px;
      height: 18px;
    }
    p {
      font-weight: 700;
      font-size: 0.6rem;
      line-height: 21px;
      text-transform: capitalize;
      color: #ffffff;
    }
  }
  .linko {
    &:hover {
      background: #1f607a;
    }
    transition: all 0.4s;
    font-weight: 700;
    font-size: 0.6rem;
    line-height: 21px;
    padding-left: 20px;
    text-transform: capitalize;
    color: #ffffff;
    width: 100%;
    cursor: pointer;
  }
  .category {
    font-weight: 700;
    font-size: 0.6rem;
    line-height: 21px;
    padding-left: 20px;
    width: 100%;
    color: rgba(255, 255, 255, 0.55);
  }
`;

const links = [
  { name: "Trending", icon: trending },
  { name: "Favorites", icon: fav },
  { name: "Fresh", icon: fresh },
];

function Sidebar() {
  const { filterStatus, nfts, account } = useSelector((state) => state.web3);
  const [open, setOpen] = useState(true);
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
    <Wrapper open={open}>
      <div className="collapse" onClick={() => setOpen(!open)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
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
      <p className="category">Explore Popular Tags</p>
      {categories.length > 0 &&
        categories.map((category) => (
          <p
            className={`linko ${filterStatus === category ? "active" : ""}`}
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
