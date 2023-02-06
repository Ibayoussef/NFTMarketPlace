import styled from "styled-components";
import wtsp from "../../assets/wtsp.svg";
import messanger from "../../assets/messange.svg";
import share from "../../assets/share.svg";
import { ethers } from "ethers";
import NFTMarketplace from "../../data/abi/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import Address from "../../data/abi/contracts/NFTMarketplace.sol/Address.json";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
const Wrapper = styled.div`
.owner-container {
    display: flex;
    gap: 7px;
    flex-direction: row;
    justify-content: flex-start,
    align-items: center;
    align-self: center;
    .time {
      font-weight: 700;
font-size: 0.4rem;
line-height: 21px;

color: #1F607A;
    }
    .avatar {
        background: linear-gradient(139.9deg, #7F16E3 22.86%, #3DC8DF 94.38%);
        border-radius: 100%;
        width: 19px;
        height: 19px;
    }
    .owner {
        font-weight: 700;
        font-size: 0.6rem;
        line-height: 24px;
        color: #FFFFFF;
    }
}
.name, .desc {
    font-weight: 700;
font-size: 0.9rem;
line-height: 36px;
color: #FFFFFF;
}
.img-container {
  position: relative;
  width: 500px;
height: 711px;
background: black;
}
.nft-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.buttons {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    .socials {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 9px;
        img {
            cursor: pointer;
        }
    }
    .like {
        padding: 16px 10px;
          display: flex;
        gap: 11px;
    align-items: center;
    flex-direction: row;
    border: 1px solid #1F607A;
border-radius: 6px;
background: transparent;
font-weight: 700;
font-size: 0.5rem;
line-height: 21px;
color: rgba(31, 96, 122, 0.65);
cursor: pointer;
transition: all 0.4s;
&:hover {
    color: white; 
     path {
     stroke: white;
    }
 
    background-color:rgba(31, 96, 122, 0.65);
}
    }
}
.tags {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 50%;
    gap: 11px;
    margin-top: 17px;
    .tag {
        background: #1F607A;
border-radius: 6px;
font-weight: 700;
font-size: 0.5rem;
line-height: 21px;
padding: 4px 14px;
color: #FFFFFF;
    }
    p {
        font-weight: 700;
font-size: 0.5rem;
line-height: 21px;
color: #1F607A;
    }
}
`;

function NFT({ item, setLike, like }) {
  const handleLike = async (tokenID) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.address,
      NFTMarketplace,
      signer
    );
    try {
      let transaction = await contract.connect(signer).addLikeToNft(tokenID);
      await transaction.wait();
    } catch {
      toast.error("You already liked this meme", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setLike(!like);
  };
  return (
    <Wrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <div className="owner-container">
        <div className="avatar"></div>
        <p className="owner">{item.seller.slice(0, 5)}</p>
        <p className="time">
          {formatDistanceToNow(fromUnixTime(item.created))}
        </p>
      </div>
      <h1 className="name">{item.name}</h1>
      <h2 className="desc">{item.description}</h2>
      <div className="img-container">
        <img className="nft-img" src={item.image} alt="nft" />
      </div>

      <div className="buttons">
        <button className="like" onClick={() => handleLike(item.tokenId)}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.4799 9.09375L16.641 8.46891C16.7433 8.07214 16.9077 7.70315 17.0829 7.35507C17.1668 7.18838 17.2558 7.02151 17.343 6.85795L17.3548 6.83578C17.4468 6.66331 17.5371 6.49342 17.6243 6.31935C17.9699 5.62907 18.25 4.90179 18.25 3.97715C18.25 2.30216 17.7099 1.4747 17.1328 1.0445C16.5279 0.593593 15.7789 0.5 15.2344 0.5C15.1674 0.5 15.0767 0.528048 14.9525 0.658541C14.8239 0.793725 14.6957 1.00362 14.5746 1.27562C14.3331 1.81778 14.175 2.47572 14.0645 2.93563L14.0637 2.93877L16.4799 9.09375ZM16.4799 9.09375H17.1251M16.4799 9.09375H17.1251M17.1251 9.09375H22.0921C23.4437 9.09375 24.4937 10.2222 24.5 11.4331C24.5034 12.1854 24.1768 12.9975 23.6964 13.48L23.6919 13.4845L23.454 13.7224M17.1251 9.09375L23.454 13.7224M23.454 13.7224L23.5847 14.0323M23.454 13.7224L23.5847 14.0323M23.5847 14.0323C24.0036 15.0262 23.9296 16.4319 23.1907 17.4188L23.0335 17.6287M23.5847 14.0323L23.0335 17.6287M23.0335 17.6287L23.1168 17.8774M23.0335 17.6287L23.1168 17.8774M23.1168 17.8774C23.4788 18.9571 23.1042 20.3179 22.4297 21.0231L22.2403 21.2211M23.1168 17.8774L22.2403 21.2211M22.2403 21.2211L22.3053 21.4873M22.2403 21.2211L22.3053 21.4873M22.3053 21.4873C22.4898 22.2428 22.3895 22.8184 22.0804 23.2624M22.3053 21.4873L22.0804 23.2624M12.6915 6.05127L12.6915 6.0513C11.9775 6.76646 11.4218 7.57651 10.8081 8.47107C10.7739 8.52092 10.7395 8.57103 10.7049 8.6214C10.0559 9.56634 9.34153 10.5847 8.33775 11.5766L12.6915 6.05127ZM12.6915 6.05127C13.5148 5.22647 13.8059 4.01314 14.048 3.00399M12.6915 6.05127L14.048 3.00399M22.0804 23.2624C21.6956 23.8153 20.9909 24.1433 20.0325 24.3191M22.0804 23.2624L20.0325 24.3191M20.0325 24.3191C19.0817 24.4936 17.9882 24.5 16.9357 24.5M20.0325 24.3191L16.9357 24.5M16.9357 24.5C16.9356 24.5 16.9356 24.5 16.9355 24.5M16.9357 24.5H16.9355M16.9355 24.5L16.7968 24.5C14.5576 24.4992 12.7173 23.686 11.1619 22.994C10.7705 22.8199 10.3035 22.618 9.83172 22.4578C9.3661 22.2997 8.8605 22.1695 8.39703 22.161C8.35003 22.1602 8.3125 22.1217 8.3125 22.0751V11.6371C8.3125 11.6145 8.32162 11.5926 8.33767 11.5767L16.9355 24.5ZM14.048 3.00399C14.0533 2.98217 14.0585 2.96045 14.0637 2.93883L14.048 3.00399ZM1.17187 11.4375H5.07812C5.4492 11.4375 5.75 11.7383 5.75 12.1094V23.8281C5.75 24.1992 5.4492 24.5 5.07812 24.5H1.17187C0.800801 24.5 0.5 24.1992 0.5 23.8281V12.1094C0.5 11.7383 0.800801 11.4375 1.17187 11.4375ZM1.45312 21.875C1.45312 22.7984 2.20164 23.5469 3.125 23.5469C4.04836 23.5469 4.79687 22.7984 4.79687 21.875C4.79687 20.9516 4.04836 20.2031 3.125 20.2031C2.20164 20.2031 1.45312 20.9516 1.45312 21.875Z"
              stroke="#1F607A"
            />
          </svg>
          {item.likes}
        </button>
        <div className="socials">
          <img src={messanger} alt="messanger" />
          <img src={wtsp} alt="wtsp" />
          <img src={share} alt="share" />
        </div>
      </div>
      <div className="tags">
        <p>Tags</p>
        {item.tags.map((tag) => (
          <div className="tag">{tag}</div>
        ))}
      </div>
    </Wrapper>
  );
}

export default NFT;
