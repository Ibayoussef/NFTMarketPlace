import styled from "styled-components";
import search from "../../assets/search.svg";
import { useDispatch } from "react-redux";
import { filterNFTs } from "../../reducers/web3Reducer";
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .img-container {
    position: absolute;
    top: 2px;
    left: 20px;
    width: 50px;
    height: 30px;
  }
  .search {
    background: rgba(177, 62, 179, 0.14);
    border: 1px solid #b13eb3;
    border-radius: 20px;
    width: 100%;
    height: 100%;
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
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="img-container">
        <img src={search} alt="search" />
      </div>

      <input
        type="text"
        placeholder="Search for a Meme.."
        onChange={(e) => dispatch(filterNFTs(e.target.value))}
        className="search"
      />
    </Wrapper>
  );
}

export default Search;
