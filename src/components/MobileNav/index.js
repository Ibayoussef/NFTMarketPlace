import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storeSigner, storeContract } from "../../reducers/web3Reducer";
import { ethers } from "ethers";
import NFTMarketplace from "../../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../../data/abi/contracts/NFTMarketplace.sol/Address.json";
import mmn from "../../assets/mmn.svg";
import exch from "../../assets/exch.svg";
import wallet from "../../assets/wallet.svg";
import profile from "../../assets/profile.svg";
import explore from "../../assets/explore.svg";
const Wallet = styled.div`
  position: fixed;
  transition: all 0.4s;
  z-index: 99999;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #111111;
  border: 1px solid #7f16e3;
  border-radius: 20px;
  padding: 7px 10px;
  color: white;
  font-size: 12px;
  gap: 3px;
  img {
    position: relative;
    top: 2px;
    width: 30px;
  }
`;
const Nav = styled.div`
  position: fixed;
  transition: all 0.4s;
  z-index: 99999;
  width: ${(props) => (props.account ? "60%" : "20%")};
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 17px;
  padding: 7px 18px;
  background: #111111;
  border: 1px solid #7f16e3;
  border-radius: 32px;
  .hide {
    transition: all 0.4s;
    opacity: ${(props) => (props.account ? "1" : "0")};
    display: ${(props) => (props.account ? "block" : "none")};
  }
  img {
    cursor: pointer;
  }
`;

function MobileNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, balance } = useSelector((state) => state.web3);
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
    let balance = 0;
    if (signer) {
      balance = await contract.connect(signer).callStatic.userBalance();
    }
    window.ethereum.on("accountsChanged", async (accounts) => {
      balance = await contract.connect(signer).callStatic.userBalance();
      dispatch(
        storeSigner({ account: accounts[0], balance: balance.toString() })
      );
    });

    dispatch(storeSigner({ account: account, balance: balance.toString() }));
    dispatch(storeContract(contract.toString()));
  };
  const formatNumber = (num) => {
    if (num < 1000n) return num.toString();

    const suffixes = ["", "k", "m", "b", "t"];
    let suffixNum = Math.floor(parseInt(num).toString().length / 3) - 1;
    let shortNum = // eslint-disable-next-line eqeqeq
      (suffixNum != 0 ? num / parseInt(10) ** (suffixNum * 3) : num).toString();
    let shortNumStr = shortNum + suffixes[suffixNum];

    return shortNumStr;
  };
  return (
    <>
      <Nav account={account}>
        <img
          className="hide"
          onClick={() => navigate("/explore")}
          src={explore}
          alt=""
        />
        <img
          className="hide"
          onClick={() => navigate("/swap")}
          src={exch}
          alt=""
        />
        <img
          className="hide"
          onClick={() => navigate("/profile")}
          src={profile}
          alt=""
        />

        <img onClick={() => handleConnect()} src={wallet} alt="" />
      </Nav>
      {account && (
        <Wallet>
          <p>{formatNumber(balance)}</p>
          <img src={mmn} alt="mmn" />
        </Wallet>
      )}
    </>
  );
}

export default MobileNav;
