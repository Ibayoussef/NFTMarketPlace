import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { storeSigner, storeContract } from "../reducers/web3Reducer";
import Search from "./Search";
import { ethers } from "ethers";
import NFTMarketplace from "../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../data/abi/contracts/NFTMarketplace.sol/Address.json";
import bell from "../assets/bell.svg";
const Nav = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 99999;
  width: 100%;

  .rightside,
  .leftside {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 17px;
    width: ${(props) => (props.explorepage ? "100%" : "30%")};
    p,
    a {
      font-weight: 700;
      font-size: 0.7rem;
      position: relative;

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
  .rightside {
    justify-content: flex-end;
  }
  flex-direction: row;
  background-color: transparent;
  img {
    cursor: pointer;
    position: relative;
    top: 5px;
  }
  .links {
    position: relative;
    justify-content: center;
    flex-direction: row;
    display: flex;
    gap: 50px;
    width: 100%;
    align-self: center;
    p,
    a {
      font-weight: 700;
      font-size: 1rem;
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
    font-size: 1rem;
    line-height: 36px;
    padding: 6px 36px;
    width: fit-content;
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
  const location = useLocation();
  const explorepage = location.pathname === "/explore";
  const createpage = location.pathname === "/create";
  const profilepage = location.pathname === "/profile";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useSelector((state) => state.web3);
  useEffect(() => {
    const feature = document.querySelector("#feature");
    const roadmap = document.querySelector("#roadmap");
    if (feature && roadmap) {
      setFeature(feature);
      setRoadmap(roadmap);
    }
  }, [feature, roadmap]);
  const handleConnect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    window.ethereum.on("accountsChanged", (accounts) => {
      dispatch(
        storeSigner({ account: accounts[0], signer: signer.toString() })
      );
    });
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
    <Nav explorepage={explorepage}>
      <div className="leftside">
        <img onClick={() => navigate("/")} src={logo} alt="logo" />
        {explorepage && (
          <p
            onClick={() => {
              navigate("/profile");
            }}
          >
            Go To My Profile
          </p>
        )}
      </div>

      {!explorepage && !createpage && !profilepage && (
        <div className="links">
          <p onClick={() => navigate("/explore")}>Explore</p>

          <p
            onClick={() => {
              navigate("/");
              setTimeout(() => feature.scrollIntoView(), 1000);
            }}
          >
            Features
          </p>
          <p
            onClick={() => {
              navigate("/");
              setTimeout(() => roadmap.scrollIntoView(), 1000);
            }}
          >
            RoadMap
          </p>
        </div>
      )}
      <div className="rightside">
        {explorepage && (
          <>
            <Search />
            <img src={bell} alt="notif" />
          </>
        )}
        {(createpage || profilepage) && (
          <>
            <p
              onClick={() => {
                navigate("/explore");
              }}
            >
              Explore
            </p>
          </>
        )}
        {!explorepage && account && (
          <>
            <p
              onClick={() => {
                navigate("/swap");
              }}
            >
              Swap
            </p>
            <p
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </p>
          </>
        )}
        {(createpage || profilepage) && <img src={bell} alt="notif" />}
        <button onClick={() => handleConnect()} className="connect">
          {account ? account.slice(0, 5) : "Connect"}
        </button>
      </div>
    </Nav>
  );
}

export default Navbar;
