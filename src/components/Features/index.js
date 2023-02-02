import styled from "styled-components";
import mascot from "../../assets/mascot.jpg";
import Description from "./Description";
const Wrapper = styled.div`
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
  height: 100vh;
  * {
    margin-top: 50px;
  }
  background: linear-gradient(
    180deg,
    rgba(177, 62, 179, 0) 0%,
    rgba(177, 62, 179, 0.35) 6.25%,
    rgba(177, 62, 179, 0.26) 59.9%,
    rgba(35, 31, 58, 0.77) 100%
  );
  img {
    border: 8px solid #8c308d;
    border-radius: 67px;
    position: relative;
    left: -47px;
  }
`;

function Features() {
  return (
    <Wrapper>
      <img src={mascot} alt="mascot" />
      <Description />
    </Wrapper>
  );
}

export default Features;
