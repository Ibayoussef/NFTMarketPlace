import { useState } from "react";
import AddNFTform from "./AddNFTform";
import { ethers } from "ethers";
import { PINATA_API_Key } from "../keys.js";
import { useSelector } from "react-redux";
import Pinata from "react-pinata";
function PinataForm() {
  const { signer, contract } = useSelector((state) => state);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const [fileURL, setFileUrl] = useState("");
  const [metaDataUrl, setMetaDataUrl] = useState("");
  const handleSubmitNFT = async () => {
    setMessage("Please wait.. uploading (upto 5 mins)");
    //Pull the deployed contract instance

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
  );
}

export default PinataForm;
