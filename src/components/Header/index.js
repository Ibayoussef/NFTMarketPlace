import styled from "styled-components";
import Introduction from "./Introduction";
import headerimg from "../../assets/home.jpg";
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  .elipse {
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 100%;
    left: 0;
    top: 85%;
    height: 356px;
    background: #060b19;
    border-radius: 100%;
    border-top: 6px solid #b33e92;
  }
  .img-container {
    position: relative;
    object-fit: cover;
    width: 60%;
  }
  img {
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    height: 100%;
    height: 100vh;
    width: 100%;
  }
`;

function Header() {
  return (
    <Wrapper>
      <Introduction />
      <div className="img-container">
        <img src={headerimg} alt="header-img" />
      </div>

      <div className="elipse"></div>
    </Wrapper>
  );
}

export default Header;
