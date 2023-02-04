import styled from "styled-components";
import trending from "../../assets/trending.svg";
import fresh from "../../assets/fresh.svg";
import fav from "../../assets/fav.svg";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: rgba(35, 31, 58, 0.77);
  height: 100vh;
  padding: 49px 0px;
  gap: 23px;
  position: sticky;
  top: 0;
  left: 0;
  .link-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 13px;
    width: 100%;
    transition: all 0.4s;
    cursor: pointer;
    padding: 0px 49px;
    &:hover {
      background: #1f607a;
    }
    p {
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      text-transform: uppercase;
      color: #ffffff;

      text-shadow: 2px 2px 2px #7edbea;
    }
  }
`;

const links = [
  { name: "Trending", icon: trending },
  { name: "Favorites", icon: fav },
  { name: "Fresh", icon: fresh },
];

function Sidebar() {
  return (
    <Wrapper>
      {links.map((link) => (
        <div key={link.name} className="link-container">
          <img src={link.icon} alt="icon" />
          <p>{link.name}</p>
        </div>
      ))}
    </Wrapper>
  );
}

export default Sidebar;
