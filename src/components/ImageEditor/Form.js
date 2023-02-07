import styled from "styled-components";
import add from "../../assets/add.svg";
import remove from "../../assets/delete.svg";
import { useRef } from "react";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 27px;
  width: 50%;
  height: 75vh;
  .titles {
    font-weight: 700;
    font-size: 0.6rem;
    line-height: 21px;
    color: #ffffff;
  }
  .texts-container {
    .displaytexts {
      display: flex;
      width: 300px;
      flex-direction: row;
      margin-top: 10px;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      margin-left: 20px;
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
      font-size: 0.8rem;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      padding-left: 20px;
      color: #ffffff;
    }
    .textinput {
      position: relative;
      margin-top: 20px;
      input {
        background: #ffffff;
        border: 1px solid #b33e92;
        border-radius: 33px;
        font-weight: 700;
        width: 400px;
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
  .fontsize {
    padding-left: 20px;
    .range-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .value {
        background: #1f607a;
        border-radius: 6px;
        font-size: 0.6rem;
        width: fit-content;
        padding: 4px 14px;
        color: #fff;
      }
    }
    input[type="number"] {
      width: 40px;
      padding: 4px 5px;
      border: 1px solid #bbb;
      border-radius: 3px;
    }

    /* input[type="range"]:focus,
input[type="number"]:focus {
  box-shadow: 0 0 3px 1px #4b81dd;
  outline: none;
} */

    input[type="range"] {
      -webkit-appearance: none;
      margin-right: 15px;
      width: 200px;
      height: 7px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 5px;
      background-image: linear-gradient(#b33e92, #b33e92);
      background-size: 70% 100%;
      background-repeat: no-repeat;
    }

    /* Input Thumb */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #b33e92;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    input[type="range"]::-moz-range-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #b33e92;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    input[type="range"]::-ms-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #b33e92;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      background: #880f66;
    }

    input[type="range"]::-moz-range-thumb:hover {
      background: #880f66;
    }

    input[type="range"]::-ms-thumb:hover {
      background: #880f66;
    }

    /* Input Track */
    input[type="range"]::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }

    input[type="range"]::-moz-range-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }

    input[type="range"]::-ms-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }
  }
  .font-color {
    padding-left: 20px;
    input {
      margin-top: 10px;
    }
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100px;
      height: 100px;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    input::-webkit-color-swatch {
      border-radius: 15px;
      border: none;
    }
    input::-moz-color-swatch {
      border-radius: 15px;
      border: none;
    }
  }
  .save {
    margin-left: 20px;

    background: #b13eb3;
    border-radius: 30px;
    font-weight: 700;
    font-size: 0.6rem;
    line-height: 24px;
    padding: 12px 14px;
    color: #ffffff;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    width: 100%;
    padding: 10px;
    gap: 4px;
    input {
      width: 100% !important;
    }
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .font-color {
      input {
        margin-top: 2px;
        width: 50px !important;
        height: 50px;
      }
    }
  }
`;

function Form({
  newText,
  handleAddText,
  handleTextChange,
  texts,
  handleRemoveText,
  handleExport,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  fontWeight,
  setFontWeight,
  setImage,
  setActive,
  mobile,
}) {
  const range = useRef();
  const rangeWeight = useRef();
  const handleFontSize = () => {
    range.current.style.backgroundSize =
      ((range.current.value - range.current.min) * 100) /
        (range.current.max - range.current.min) +
      "% 100%";

    setFontSize(range.current.value);
  };
  const handleFontWeight = () => {
    rangeWeight.current.style.backgroundSize =
      ((rangeWeight.current.value - rangeWeight.current.min) * 100) /
        (rangeWeight.current.max - rangeWeight.current.min) +
      "% 100%";

    setFontWeight(rangeWeight.current.value);
  };
  return (
    <Wrapper>
      <div className="texts-container">
        <p className="titles">Add Text to Image:</p>
        <div className="textinput">
          <input
            type="text"
            value={newText}
            onChange={handleTextChange}
            placeholder="Enter text to add"
          />
          <button onClick={handleAddText}>
            <img src={add} alt="add" />
          </button>
        </div>
        <div className="displaytexts">
          {texts.map((text, index) => (
            <div key={index} className="text">
              <p>{text.text}</p>

              <button onClick={() => handleRemoveText(index)}>
                <img src={remove} alt="add" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {!mobile && (
        <>
          <div className="fontsize">
            <p className="titles">Text Size:</p>
            <div className="range-container">
              <input
                ref={range}
                type="range"
                min={10}
                max={150}
                value={fontSize}
                onInput={() => handleFontSize()}
              />
              <div className="value">{fontSize + " px"}</div>
            </div>
          </div>
          <div className="fontsize">
            <p className="titles">Text Font Weight:</p>
            <div className="range-container">
              <input
                ref={rangeWeight}
                type="range"
                min={200}
                max={1000}
                value={fontWeight}
                onInput={() => handleFontWeight()}
              />
              <div className="value">{fontWeight}</div>
            </div>
          </div>
        </>
      )}
      {mobile && (
        <div className="buttons">
          <div className="fontsize">
            <p className="titles">Text Size:</p>
            <div className="range-container">
              <input
                ref={range}
                type="range"
                min={10}
                max={150}
                value={fontSize}
                onInput={() => handleFontSize()}
              />
              <div className="value">{fontSize + " px"}</div>
            </div>
          </div>
          <div className="fontsize">
            <p className="titles">Text Font Weight:</p>
            <div className="range-container">
              <input
                ref={rangeWeight}
                type="range"
                min={200}
                max={1000}
                value={fontWeight}
                onInput={() => handleFontWeight()}
              />
              <div className="value">{fontWeight}</div>
            </div>
          </div>
        </div>
      )}
      <div className="font-color">
        <p className="titles">Text Font Color:</p>
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div>
      {mobile && (
        <div className="buttons">
          <button className="save" onClick={() => handleExport()}>
            Save Image
          </button>
          <button className="save" onClick={() => setImage("")}>
            Change Image
          </button>
          <button className="save" onClick={() => setActive("second")}>
            Next
          </button>
        </div>
      )}
      {!mobile && (
        <>
          <button className="save" onClick={() => handleExport()}>
            Save Image
          </button>
          <button className="save" onClick={() => setImage("")}>
            Change Image
          </button>
          <button className="save" onClick={() => setActive("second")}>
            Next
          </button>
        </>
      )}
    </Wrapper>
  );
}

export default Form;
