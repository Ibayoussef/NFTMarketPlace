import React from "react";

function AddNFTform({ setFormData }) {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setFormData({ name: e.target.value, price: 10 })}
      />
    </div>
  );
}

export default AddNFTform;
