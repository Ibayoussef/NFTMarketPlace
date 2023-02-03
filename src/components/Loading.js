import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border: 3px solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  z-index: 999999999;
  background-color: black;
  font-family: sans-serif;
  font-size: 20px;
  color: #9302cc;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #9302cc;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  &:before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #9302cc;
    border-right: 3px solid #9302cc;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
  }
  span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
  }
  span:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #9302cc;
    top: -6px;
    right: -8px;
    box-shadow: 0 0 20px #9302cc;
  }
  @keyframes animateC {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`;
const Listed = styled.div`
  width: 50%;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: #9302cc;
  border: 3px solid #000;
  border-radius: 20px;
  text-align: center;

  z-index: 999999999;
  h1 {
    font-size: 40px;
    color: white;
    font-weight: 700;
    letter-spacing: 4px;
    line-height: 50px;
    text-transform: uppercase;
    text-shadow: 0 0 10px #9302cc;
  }
  button {
    margin-left: 10px;
    margin-top: 20px;
    background: black;
    border-radius: 30px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    padding: 12px 14px;
    color: #ffffff;
    cursor: pointer;
  }
  font-size: 40px;
  color: white;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
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
`;
function Loading({ loading, done }) {
  let navigate = useNavigate();
  return (
    <>
      {loading && !done && (
        <Loader>
          Minting
          <span></span>
        </Loader>
      )}
      {loading && done && (
        <Listed>
          <h1> Congratulations Your Meme is listed as NFT</h1>

          <button onClick={() => navigate("/")}>Go back</button>
        </Listed>
      )}
    </>
  );
}

export default Loading;
