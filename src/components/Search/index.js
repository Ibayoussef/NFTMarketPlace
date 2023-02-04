import styled from "styled-components";
import search from "../../assets/search.svg";
const Wrapper = styled.div`
  position: relative;
  img {
    position: absolute;
    top: 15px;
    left: 19px;
  }
  .search {
    background: rgba(177, 62, 179, 0.14);
    border: 1px solid #b13eb3;
    border-radius: 20px;
    width: 532px;
    height: 54px;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
    padding: 9px 61px;
    &:placeholder {
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      color: #ffffff;
    }
  }
`;

function Search() {
  return (
    <Wrapper>
      <img src={search} alt="search" />
      <input type="text" placeholder="Search for a Meme.." className="search" />
    </Wrapper>
  );
}

export default Search;
