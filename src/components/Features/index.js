import styled from "styled-components";
import mascot from "../../assets/mascot.jpg";
import Description from "./Description";
import isMobile from "ismobilejs";
const Wrapper = styled.div`
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  align-items: center;
  height: 100vh;

  background: linear-gradient(
    180deg,
    rgba(177, 62, 179, 0) 0%,
    rgba(177, 62, 179, 0.35) 6.25%,
    rgba(177, 62, 179, 0.26) 59.9%,
    rgba(35, 31, 58, 0.77) 100%
  );
  .img-container {
    position: relative;
    object-fit: cover;
    width: 50%;
    height: 100%;
    border: 8px solid #8c308d;
    border-radius: 67px;
    overflow: hidden;
    img {
      position: absolute;
      object-fit: cover;

      top: 0px;

      height: 100%;
      width: 100%;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    height: 110vh;
    padding: 50px 0;
  }
`;

function Features() {
  const mobile = isMobile().phone;
  return (
    <Wrapper id="feature">
      {!mobile && (
        <div className="img-container">
          <img src={mascot} alt="mascot" />
        </div>
      )}

      <Description />
    </Wrapper>
  );
}

export default Features;
