import { useState } from "react";
import add from "../../assets/add.svg";
import remove from "../../assets/delete.svg";
function AddNFTform({ setFormData, formData }) {
  const [tag, setTag] = useState("");
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
      <h1>Select a Tag For Your NFT:</h1>

      <div className="texts-container">
        {" "}
        <div className="textinput">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter text to add"
          />
          <button
            onClick={() =>
              setFormData({
                ...formData,
                tags: [...formData.tags, tag],
              })
            }
          >
            <img src={add} alt="add" />
          </button>
        </div>
        <div className="displaytexts">
          {formData.tags.map((text, index) => (
            <div key={index} className="text">
              <p>{text}</p>

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    tags: formData.tags.filter((tag) => tag !== text),
                  })
                }
              >
                <img src={remove} alt="add" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddNFTform;
