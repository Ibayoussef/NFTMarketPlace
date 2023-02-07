/* eslint-disable react-hooks/exhaustive-deps */
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
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isMobile from "ismobilejs";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 40px;
  margin-top: 20px;
  flex-direction: row;
  justify-content: center; 
  align-items: flex-start;

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
    height: 300vh;
    background-color: black;
    margin-top: -200px;
    z-index: 999999999999;
  }
  .form {
    width: 30%;
    position: relative;
    p {
      color: white;
      font-size: 0.6rem;
      
      padding: 10px 20px;
    }
     .texts-container {
    .displaytexts {
      display: flex;
      width: 300px;
      flex-direction: row;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      margin: 0 0 20px 20px;
  
      p {
        padding: 0px !important;
      }
      .text {
        background: #1f607a;
        border-radius: 6px;

        width: fit-content;
        padding: 4px 14px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        button {
          cursor: pointer;
          background: transparent;
          border: none;
          margin-left: 10px;
        }
      }
    }
    p {
      font-weight: 700;
      font-size: 0.5rem;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      padding-left: 20px;
      color: #ffffff;
    }
    .textinput {
      position: relative;

      input {
        background: #ffffff;
        border: 1px solid #b33e92;
        border-radius: 33px;
        font-weight: 700;
        width: 100%;
        height: 70px;
        font-size: 0.6rem;
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
      button {
        position: absolute;
        top: 50%;
        right: 17px;
        background: #b33e92;
        border-radius: 56px;
        transform: translateY(-50%);
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  }
  h1 {
    font-weight: 700;
    font-size: 0.45rem;
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
    width: 100%;
    height: 70px;
     font-size: 0.6rem;
    line-height: 24px;
    padding-left: 20px;
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
    font-size: 0.5rem;
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
    @media (max-width: 900px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .form {
        width: 100%;
        padding: 0 20px;
        h1 { font-size: 14px;}
      }
      .icon {
        bottom: 88px;
        left: 45px;
      }
      .image {
        width: 100%;
      }
    }
`;

function PinataForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 1,
    image: "",
    tags: [],
  });
  const { account } = useSelector((state) => state.web3);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [fileURL, setFileUrl] = useState("");
  const [metaDataUrl, setMetaDataUrl] = useState("");
  const handleSubmitNFT = async () => {
    setLoading(true);
    //actually create the NFT
  };
  useEffect(() => {
    const transaction = async () => {
      if (metaDataUrl) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          Address.address,
          NFTMarketplace,
          signer
        );

        //Pull the deployed contract instance

        const totalfee = await contract
          .connect(signer)
          .callStatic.getFeePrice();

        //massage the params to be sent to the create NFT request
        const price = ethers.utils.parseUnits(
          formData.price.toString(),
          "ether"
        );
        let transaction = await contract
          .connect(signer)
          .createNFT(metaDataUrl, price, {
            value: totalfee,
          });
        await transaction.wait();
        setDone(true);
      }
    };
    transaction();
  }, [metaDataUrl]);

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
  useEffect(() => {
    if (!account) {
      return () =>
        toast.error("Please Connect Your Wallet", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
    }
  }, [account]);
  return (
    <Wrapper fileURL={fileURL}>
      {loading && (
        <div className="loader">
          <Loading loading={loading} done={done} />
        </div>
      )}
      {isMobile().phone && (
        <div className="image">
          <img src={fileURL ? fileURL : preview} alt="preview" />
        </div>
      )}
      <div className="form">
        {!account && <p>Connect your wallet to be able to mint</p>}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
        <img className="icon" src={image} alt="img" />
        <Pinata
          pinataJWT={PINATA_API_Key}
          buttonClassNames={"submit"}
          formComponent={
            <AddNFTform setFormData={setFormData} formData={formData} />
          }
          pinataOptions={pinataOptions}
          pinataMetaData={metadata}
          nftDataJson={{ ...formData, image: fileURL }}
          inputClassNames={"input"}
          NFTContractInteraction={() => handleSubmitNFT()}
          setMetaDataUrl={setMetaDataUrl}
          setFileURL={setFileUrl}
        />
      </div>
      {!isMobile().phone && (
        <div className="image">
          <img src={fileURL ? fileURL : preview} alt="preview" />
        </div>
      )}
    </Wrapper>
  );
}

export default PinataForm;
