import React from "react";

function AddNFTform({ setFormData, formData }) {
  return (
    <div>
      <h1>Select a Name For Your NFT:</h1>
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <h1>Select a Price For Your NFT:</h1>
      <input
        type="text"
        placeholder="Enter Price"
        onChange={(e) =>
          setFormData({ ...formData, price: parseInt(e.target.value) })
        }
      />
      <h1>Select a Description For Your NFT:</h1>
      <input
        type="text"
        placeholder="Enter Description"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </div>
  );
}

export default AddNFTform;
