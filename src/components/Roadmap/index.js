import styled from "styled-components";
import tower from "../../assets/tower.jpg";
import Bubble from "./Bubble";
const Wrapper = styled.div`
  .bubbles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 200px;
    gap: 10rem;
  }
  .titlewrapper {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    background: #1b1122;
    align-items: center;
    padding: 50px 0px;
    .title {
      font-weight: 600;
      font-size: 36px;
      line-height: 54px;
      display: flex;
      align-items: center;
      text-align: center;
      background: linear-gradient(180deg, #60d0e1 0%, #b23e91 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  @keyframes saturate {
    0%,
    100% {
      -webkit-filter: saturate(1);
    }
    50% {
      -webkit-filter: saturate(3);
    }
  }
  .roadmap {
    position: relative;
    object-fit: cover;
    width: 100%;
    height: 300vh;
    img {
      animation: saturate 3s infinite;
      position: absolute;
      object-fit: cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: 900px) {
    .titlewrapper {
      .title {
        font-size: 20px;
      }
      .bubbles {
        gap: 50px;
      }
    }
  }
`;

function Roadmap() {
  const roadmapData = [
    {
      title: "Q1 2023:",
      mt: "0",
      ml: "0",
      arrowParams: { mt: "220px", ml: "410px", rotate: "rotate(149deg)" },
      desc: "Launch of MemeNation beta version with core features, including meme creation, NFT minting, and in-app currency (Memenation Tokens)Onboarding of early adopters and testing of platform functionality",
    },
    {
      title: "Q2 2023:",
      mt: "0",
      ml: "0",
      arrowParams: { mt: "220px", ml: "-30px", rotate: "rotate(-149deg)" },
      desc: "Rollout of marketplace functionality, allowing users to buy and sell NFTs. Expansion of community features, including social sharing, profiles, and user-generated content. Partnership with key influencers and meme makers to drive adoption and usage.",
    },
    {
      title: "Q3 2023:",
      mt: "0",
      ml: "0",
      arrowParams: { mt: "220px", ml: "410px", rotate: "rotate(149deg)" },
      desc: "Introduction of new NFT categories, including custom stickers, animations, and audio memes. Launch of mobile app to increase accessibility and engagement. Expansion of partnership program to include strategic brands and advertisers.",
    },
    {
      title: "Q4 2023:",
      mt: "0",
      ml: "0",
      arrowParams: { mt: "220px", ml: "-30px", rotate: "rotate(-149deg)" },
      desc: "Integration of additional blockchain protocols to increase NFT interoperability and liquidity. Launch of creator incentives program to reward top performers and foster growth of the platform. Expansion into new international markets to reach a wider audience.",
    },
    {
      title: "2024 and beyond:",
      mt: "0",
      ml: "0",

      arrowParams: { mt: "220px", ml: "410px", rotate: "rotate(149deg)" },
      desc: "Continual innovation and improvements to the platform, including new features and functionalities based on user feedback and market trends. Expansion into additional NFT-related use cases and markets, including gaming and collectibles.",
    },
  ];
  return (
    <Wrapper id="roadmap">
      <div className="titlewrapper">
        <h1 className="title">Roadmap for MemeNation</h1>
      </div>

      <div className="roadmap">
        <div className="bubbles">
          {roadmapData.map((data) => (
            <Bubble
              key={data.title}
              arrowParams={data.arrowParams}
              mt={data.mt}
              ml={data.ml}
              title={data.title}
              desc={data.desc}
            />
          ))}
        </div>

        <img src={tower} alt="tower" />
      </div>
    </Wrapper>
  );
}

export default Roadmap;
