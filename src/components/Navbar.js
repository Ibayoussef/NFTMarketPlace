import styled from "styled-components";
import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { storeSigner, storeContract } from "../reducers/web3Reducer";
import { ethers } from "ethers";
import NFTMarketplace from "../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../data/abi/contracts/NFTMarketplace.sol/Address.json";
const Nav = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  z-index: 99999;
  width: 100%;

  flex-direction: row;
  background-color: transparent;
  img {
    cursor: pointer;
  }
  .links {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 50px;
    p,
    a {
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      cursor: pointer;
      color: #ffffff;
      text-shadow: 2px 2px 2px #7edbea;
      transition: all 0.4s;
      text-decoration: none;
      &:hover {
        transform: translateY(-2px);
        text-shadow: 2px 1.5px 2px #7edbea;
      }
      &:active {
        transform: translateY(-1px);
        text-shadow: 2px 1.75px 2px #7edbea;
      }
    }
  }
  .connect {
    position: relative;
    z-index: 1000;
    background: #b33e92;
    box-shadow: 2px 2px 2px #b33e92;
    border-radius: 39px;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    padding: 6px 36px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.4s;
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

function Navbar() {
  const [feature, setFeature] = useState();
  const [roadmap, setRoadmap] = useState();
  const dispatch = useDispatch();

  const { account } = useSelector((state) => state.web3);
  useEffect(() => {
    const feature = document.querySelector("#feature");
    const roadmap = document.querySelector("#roadmap");
    if (feature && roadmap) {
      setFeature(feature);
      setRoadmap(roadmap);
    }
  }, []);
  const handleConnect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
      Address.address,
      NFTMarketplace,
      signer
    );
    dispatch(storeSigner({ account: account, signer: signer.toString() }));
    dispatch(storeContract(contract.toString()));
  };

  return (
    <Nav>
      <img src={logo} alt="logo" />
      <div className="links">
        <p>Explore</p>
        <p onClick={() => feature.scrollIntoView()}>Features</p>
        <p onClick={() => roadmap.scrollIntoView()}>RoadMap</p>
      </div>
      <button onClick={() => handleConnect()} className="connect">
        {account ? account.slice(0, 5) : "Connect"}
      </button>
    </Nav>
  );
}

export default Navbar;
