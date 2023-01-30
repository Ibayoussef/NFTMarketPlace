import "./App.css";
import { useState } from "react";
import { PINATA_API_Key } from "./keys.js";
import NFTMarketplace from "./data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import AddNFTform from "./components/AddNFTform";
import Pinata from "react-pinata";
import { ethers } from "ethers";
function App() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const [fileURL, setFileUrl] = useState("");
  const [metaDataUrl, setMetaDataUrl] = useState("");
  const handleSubmitNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setMessage("Please wait.. uploading (upto 5 mins)");
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      "0xA01F6C40Bc4Af448a227C8Ce33E3FcC5eff52A0C",
      NFTMarketplace,
      signer
    );
    const totalfee = await contract.connect(signer).callStatic.getFeePrice();
    //massage the params to be sent to the create NFT request
    const price = ethers.utils.parseUnits(formData.price.toString(), "ether");
    console.log(totalfee);
    //actually create the NFT
    let transaction = await contract
      .connect(signer)
      .createNFT(metaDataUrl, price, {
        value: totalfee,
      });
    await transaction.wait();

    setMessage("");
    setFormData({ name: "", description: "", price: "" });
  };
  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });

  //pinataOptions are optional
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
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Pinata
          pinataJWT={PINATA_API_Key}
          buttonClassNames={"custom-button-class"}
          formComponent={<AddNFTform setFormData={setFormData} />}
          pinataOptions={pinataOptions}
          pinataMetaData={metadata}
          nftDataJson={formData}
          inputStyle={{ color: "blue" }}
          inputClassNames={"custom-input-class"}
          buttonStyle={{ backgroundColor: "green" }}
          NFTContractInteraction={() => handleSubmitNFT()}
          setMetaDataUrl={setMetaDataUrl}
          setFileURL={setFileUrl}
        />
      </header>
    </div>
  );
}

export default App;
