import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #060b19;
  padding: 0px 20px;

  height: 100vh;
  gap: 44px;
  .title {
    font-weight: 700;
    font-size: 4rem;
    line-height: 108%;
    letter-spacing: 0.17em;
    color: #ffffff;
    text-shadow: 2px 2px 2px #7edbea;
  }
  .description {
    font-weight: 400;
    font-size: 2rem;
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
    font-size: 1.5rem;
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
`;

function Introduction() {
  return (
    <Wrapper>
      <h1 className="title">Discover The Future Of Memes</h1>
      <h2 className="description">
        Welcome to MemeNation, the ultimate platform for meme creators! Here,
        you can unleash your creativity and turn your memes into unique,
        one-of-a-kind digital assets that you can own, sell, and profit from.
      </h2>
      <div className="explore">EXPLORE</div>
    </Wrapper>
  );
}

export default Introduction;
