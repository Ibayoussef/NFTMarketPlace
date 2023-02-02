import styled from "styled-components";
import Introduction from "./Introduction";
import headerimg from "../../assets/home.jpg";
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
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
  img {
    height: 100vh;
  }
`;

function Header() {
  return (
    <Wrapper>
      <Introduction />
      <img src={headerimg} alt="header-img" />
      <div className="elipse"></div>
    </Wrapper>
  );
}

export default Header;
