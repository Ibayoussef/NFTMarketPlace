import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  width: 50%;
  .mt-39 {
    margin-top: 1.5rem;
  }
  .mt-13 {
    margin-top: 13px;
  }
  .title,
  .minititle {
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 108%;
    text-align: center;
    letter-spacing: 0.17em;
    background: linear-gradient(180deg, #b13eb3 0%, #7edbea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 2px 2px 2px #7edbea;
  }
  .minititle {
    font-size: 0.7rem;
  }
  .slogan {
    font-weight: 400;
    font-size: 0.7rem;
    line-height: 36px;
  }
  .button {
    background: #b33e92;
    box-shadow: 2px 2px 2px #b33e92;
    border-radius: 39px;
    padding: 10px 26px;
    font-weight: 700;
    font-size: 0.7rem;
    line-height: 36px;
    color: white;
    transition: all 0.4s;
    cursor: pointer;
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
  @media (max-width: 900px) {
    width: 100%;
    height: 100vh;
    padding: 60px 20px;
    padding-bottom: 50px;
    .title {
      margin-top: 50px;
    }
    .title,
    .minititle {
      font-size: 18px;
    }
    .slogan {
      font-size: 10px;
    }
    .mt-39 {
      margin-top: 11px;
    }
    .mt-13 {
      margin-top: 9px;
    }
    .button {
      font-size: 11px;
      margin-top: 10px;
      padding: 5px 10px;
    }
  }
`;

function Description() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h3 className="title">Features of MemeNation</h3>
      <p className="slogan mt-13">
        With MemeNation, your memes are minted into NFTs (Non-Fungible Tokens),
        giving you full ownership and control over your creations. Each NFT is
        verified on the blockchain, ensuring its authenticity and scarcity.
      </p>
      <h4 className="minititle mt-39">You own every meme</h4>
      <p className="slogan mt-13">
        And that's not all - every time someone likes your meme, you get paid in
        Memenation Tokens, our in-app currency. These tokens can be redeemed for
        real money, or used to purchase other NFTs on the platform.
      </p>
      <p className="slogan mt-39">
        So what are you waiting for? Start creating and sharing your memes today
        and join the meme revolution! And for those looking to invest in the
        next big thing, our marketplace is the perfect place to discover and
        purchase the hottest memes around.
      </p>
      <p className="slogan mt-39">
        Join MemeNation now and turn your memes into valuable digital assets!
      </p>
      <button className="button mt-39" onClick={() => navigate("/create")}>
        CREATE YOUR FIRST MEME
      </button>
    </Wrapper>
  );
}

export default Description;
