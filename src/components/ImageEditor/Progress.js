import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .first-step,
  .second-step {
    border: 2px solid #1f607a;
    border-radius: 176px;
    font-weight: 700;
    font-size: 24px;
    width: 40px;

    justify-content: center;
    line-height: 36px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .first-step {
    background: ${(props) =>
      props.active === "first" ? "#1f607a" : "transparent"};
    color: ${(props) => (props.active === "first" ? "white" : "#1f607a")};
  }
  .second-step {
    background: ${(props) =>
      props.active === "second" ? "#1f607a" : "transparent"};
    color: ${(props) => (props.active === "second" ? "white" : "#1f607a")};
  }
  .line {
    background: #1f607a;
    height: 1px;
    width: 50%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 63%;
  position: relative;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  .first,
  .second {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #1f607a;
  }
  .second {
    position: relative;
    right: 30px;
  }
`;

function Progress({ active }) {
  return (
    <>
      <Wrapper active={active}>
        <div className="first-step">1</div>

        <div className="line"></div>
        <div className="second-step">2</div>
      </Wrapper>
      <TextContainer>
        <div className="first">Create your Meme</div>
        <div className="second">Mint it to NFT</div>
      </TextContainer>
    </>
  );
}

export default Progress;
