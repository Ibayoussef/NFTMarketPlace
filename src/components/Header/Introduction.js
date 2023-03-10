import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #060b19;
  padding: 0px 20px;
  width: 50%;
  height: 100vh;
  gap: 44px;
  .title {
    font-weight: 700;
    font-size: 2rem;
    line-height: 108%;
    letter-spacing: 0.17em;
    color: #ffffff;
    text-shadow: 2px 2px 2px #7edbea;
  }
  .description {
    font-weight: 400;
    font-size: 1rem;
    line-height: 48px;
    color: #ffffff;
  }
  .explore {
    position: relative;
    z-index: 1000;
    background: #b33e92;
    box-shadow: 2px 2px 2px #b33e92;
    border-radius: 39px;
    font-weight: 700;
    font-size: 1rem;
    line-height: 36px;
    padding: 6px 36px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.4s;
    text-shadow: 2px 2px 2px #7edbea;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 2px 1px 2px #b33e92;
    }
    &:active {
      transform: translateY(-1px);
      box-shadow: 2px 1.5px 2px #b33e92;
    }
  }
  @media (max-width: 900px) {
    background: #060b19;
    border: 1px solid #5f2fc0;
    border-radius: 71px;
    width: 100%;
    height: 100%;
    gap: 22px;
    position: relative;
    margin-top: -150px;
    padding: 50px 20px;
    justify-content: flex-start;
    .title {
      font-size: 24px;
    }
    .description {
      font-size: 14px;
    }
    .explore {
      font-size: 14px;
    }
  }
`;

function Introduction() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1 className="title">Discover The Future Of Memes</h1>
      <h2 className="description">
        Welcome to MemeNation, the ultimate platform for meme creators! Here,
        you can unleash your creativity and turn your memes into unique,
        one-of-a-kind digital assets that you can own, sell, and profit from.
      </h2>
      <div onClick={() => navigate("/explore")} className="explore">
        EXPLORE
      </div>
    </Wrapper>
  );
}

export default Introduction;
