/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Form from "./Form";
import styled from "styled-components";
import preview from "../../assets/placeholder.png";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 47px;
  flex-wrap: wrap;

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
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      top: 0;
      left: 0;
    }
  }
`;

function Editor({ setActive }) {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [newText, setNewText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontColor, setFontColor] = useState("#ffffff");
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleAddText = () => {
    setTexts([
      ...texts,
      {
        text: newText,
        x: 0,
        y: 50,
      },
    ]);
    setNewText("");
  };

  const handleRemoveText = (index) => {
    setTexts(texts.filter((_, i) => i !== index));
  };

  const handleMouseDown = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const clickedTextIndex = texts.findIndex(
      (text) =>
        x >= text.x &&
        x <=
          text.x + canvasRef.current.getContext("2d").measureText(text).width &&
        y >= text.y - 48 &&
        y <= text.y
    );

    if (clickedTextIndex === -1) return;

    setSelectedTextIndex(clickedTextIndex);
    setDragStart({ x, y });
    setDragging(true);
  };

  const handleMouseUp = (e) => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;

    setTexts(
      texts.map((text, i) => {
        if (i !== selectedTextIndex) return text;

        return {
          ...text,
          x: text.x + deltaX,
          y: text.y + deltaY,
        };
      })
    );

    setDragStart({ x, y });
  };

  const drawImage = () => {
    if (!canvasRef.current || !image) return;

    const ctx = canvasRef.current.getContext("2d");

    const img = new Image();
    img.src = image;
    img.onload = function () {
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      texts.forEach((text) => {
        ctx.font = `${fontWeight} ${fontSize}px sans-serif`;
        ctx.fillStyle = fontColor;
        ctx.fillText(text.text, text.x, text.y);
      });
    };
  };

  const handleExport = () => {
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };
  useEffect(() => {
    if (image) {
      drawImage();
    }
  }, [image, texts, newText, fontColor, fontSize, fontWeight]);

  return (
    <Wrapper>
      <Form
        newText={newText}
        handleAddText={handleAddText}
        handleTextChange={handleTextChange}
        texts={texts}
        handleRemoveText={handleRemoveText}
        handleExport={handleExport}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontColor={fontColor}
        setFontColor={setFontColor}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
        setImage={setImage}
        setActive={setActive}
      />
      <div className="image">
        {!image && (
          <>
            <input type="file" onChange={handleFileChange} />
            <img src={preview} alt="preview" />
          </>
        )}
        {image && (
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          />
        )}
      </div>
    </Wrapper>
  );
}

export default Editor;
