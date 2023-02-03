import { useState, useEffect } from "react";
import AddNFTform from "./AddNFTform";
import { ethers } from "ethers";
import { PINATA_API_Key } from "../../keys.js";
import preview from "../../assets/placeholder.png";
import Pinata from "react-pinata";
import styled from "styled-components";
import Address from "../../data/abi/contracts/NFTMarketplace.sol/Address.json";
import NFTMarketplace from "../../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Loading from "../Loading";
import image from "../../assets/image.svg";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: no-wrap;
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  .icon {
    position: absolute;
    bottom: 85px;
    left: 25px;
    width: 20px;
    height: 20px;
    fill: #b33e92;
  }
  .loader {
    position: fixed;
    width: 100%;
    height: 200vh;
    background-color: black;
    z-index: 9999999999;
  }
  .form {
    width: 30%;
    position: relative;
  }
  h1 {
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    color: #ffffff;
    padding-left: 20px;
  }
  input[type="text"] {
    margin: 20px 0px;
    background: #ffffff;
    border: 1px solid #b33e92;
    border-radius: 33px;
    font-weight: 700;
    width: 400px;
    height: 70px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 20px;
    color: #000000;
    &:placeholder {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #000000;
    }
  }
  .input {
    -webkit-appearance: none;
    position: relative;
    appearance: none;
    background: transparent;
    border: 1px solid #b33e92;
    border-radius: 33px;
    font-weight: 700;
    margin-left: 10px;
    width: 50px;
    height: 50px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 20px;
    padding-top: 20px;
    color: #000000;
    display: block;
     text-indent: -9999em;
      cursor: pointer;

     

  }
  #file-upload-button {
    display: none !important;
  }
  .submit {
    margin-left: 10px;
    margin-top: 20px;
    background: #b13eb3;
    border-radius: 30px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    padding: 12px 14px;
    color: #ffffff;
    cursor: pointer;
  }
   .image {
    position: relative;
   
    width: 40%;
    canvas {
        width: 100%;
        height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      z-index: 99:
      position: absolute;
      top: 0;
      object-fit: cover;
      left: 0;
    }}
`;

function PinataForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 1,
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [fileURL, setFileUrl] = useState("");
  const [metaDataUrl, setMetaDataUrl] = useState("");
  const handleSubmitNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      Address.address,
      NFTMarketplace,
      signer
    );
    setLoading(true);
    //Pull the deployed contract instance

    const totalfee = await contract.connect(signer).callStatic.getFeePrice();

    //massage the params to be sent to the create NFT request
    const price = ethers.utils.parseUnits(formData.price.toString(), "ether");

    //actually create the NFT
    let transaction = await contract
      .connect(signer)
      .createNFT(metaDataUrl, price, {
        value: totalfee,
      });
    await transaction.wait();

    setDone(true);
    setFormData({ name: "", description: "", price: 0 });
  };
  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  return (
    <Wrapper fileURL={fileURL}>
      {loading && (
        <div className="loader">
          <Loading loading={loading} done={done} />
        </div>
      )}
      <div className="form">
        <img className="icon" src={image} alt="img" />
        <Pinata
          pinataJWT={PINATA_API_Key}
          buttonClassNames={"submit"}
          formComponent={
            <AddNFTform setFormData={setFormData} formData={formData} />
          }
          pinataOptions={pinataOptions}
          pinataMetaData={metadata}
          nftDataJson={formData}
          inputClassNames={"input"}
          NFTContractInteraction={() => handleSubmitNFT()}
          setMetaDataUrl={setMetaDataUrl}
          setFileURL={setFileUrl}
        />
      </div>
      <div className="image">
        <img src={fileURL ? fileURL : preview} alt="preview" />
      </div>
    </Wrapper>
  );
}

export default PinataForm;
