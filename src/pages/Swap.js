import styled from "styled-components";
import { useState } from "react";
import eth from "../assets/eth.svg";
import switchpc from "../assets/switch.svg";
import mmn from "../assets/mmn.svg";
import { ethers } from "ethers";
import NFTMarketplace from "../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../data/abi/contracts/NFTMarketplace.sol/Address.json";
const Wrapper = styled.div`
  background: #000;
  height: 100vh;
  position: relative;
  .swapbutton {
    position: absolute;
    border-radius: 10px;
    background: #9302cc;
    width: 30px;
    height: 30px;
    top: 46.5%;
    z-index: 99999;
    transform: translateY(-50%);
    cursor: pointer;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding: 5px;
    }
  }
  .swap-container {
    position: absolute;
    background: #111;
    border: 3px solid #000;
    border-radius: 20px;
    top: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 50%;
    padding: 20px;
    text-align: center;
    color: white;
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);

    text-shadow: 0 0 10px #9302cc;
    animation: shadow 3s infinite;
    box-shadow: 0 0 60px #9302cc;
    @keyframes shadow {
      0%,
      100% {
        box-shadow: 0 0 60px #9302cc;
      }
      50% {
        box-shadow: 0 0 20px #9302cc;
      }
    }
    .button-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button {
      margin-top: 20px;
      background: #9302cc;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.5rem;
      line-height: 24px;
      padding: 12px 14px;
      color: #ffffff;
      cursor: pointer;
    }
    .first {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;
      gap: 20px;
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        width: 40px;
        height: 30px;
      }
    }
    input {
      margin: 5px 0px;
      background: #ffffff;
      border: 1px solid #b33e92;
      border-radius: 10px;
      font-weight: 700;
      width: 100%;
      height: 70px;
      font-size: 16px;
      line-height: 24px;
      padding: 0px 20px;
      color: #000000;

      &:placeholder {
        font-weight: 700;
        font-size: 0.4rem;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #000000;
      }
    }
  }
`;

function Swap() {
  const [ethvalue, setEthValue] = useState("0");
  const [flip, setFlip] = useState(false);
  const handleSwap = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.address,
      NFTMarketplace,
      signer
    );
    if (!flip) {
      let transaction = await contract.connect(signer).swapETHbyTKN({
        value: ethers.utils.parseUnits(ethvalue, "ether"),
      });
      await transaction.wait();
    } else {
      let transaction = await contract
        .connect(signer)
        .swapTKNbyETH(ethers.utils.parseUnits(ethvalue, "ether"));
      await transaction.wait();
    }
  };

  return (
    <Wrapper>
      <div className="swap-container">
        <p>{!flip ? "Swap ETH to MMN" : "Swap MMN to ETH"}</p>
        {!flip && (
          <div className="first">
            <input
              type="text"
              value={ethvalue}
              onChange={(e) => setEthValue(e.target.value)}
            />
            <img src={eth} alt="eth" />
          </div>
        )}
        {flip && (
          <div className="first">
            <input
              type="text"
              value={ethvalue}
              onChange={(e) => setEthValue(e.target.value)}
            />
            <img src={mmn} alt="mmn" />
          </div>
        )}
        <div className="swapbutton">
          <img onClick={() => setFlip(!flip)} src={switchpc} alt="switch" />
        </div>

        {!flip && (
          <div className="first">
            <input type="text" disabled value={parseInt(ethvalue * 100000)} />
            <img src={mmn} alt="mmn" />
          </div>
        )}
        {flip && (
          <div className="first">
            <input
              type="text "
              disabled
              value={(parseInt(ethvalue) / 100000).toString()}
            />
            <img src={eth} alt="eth" />
          </div>
        )}
        <div className="button-container">
          <button onClick={() => handleSwap()}>Swap</button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Swap;
