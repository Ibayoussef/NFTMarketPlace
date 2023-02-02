import styled from "styled-components";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
const Wrapper = styled.div`
  background: #060b19;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 34px 0;
  .about {
    width: 30%;
    p {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: white;
    }
  }

  .links {
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    display: flex;
    width: 30%;
    gap: 20px;
    p {
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      cursor: pointer;
      color: #ffffff;
      text-shadow: 2px 2px 2px #7edbea;
      transition: all 0.4s;
      text-decoration: none;
      &:hover {
        transform: translateY(-2px);
        text-shadow: 2px 1.5px 2px #7edbea;
      }
      &:active {
        transform: translateY(-1px);
        text-shadow: 2px 1.75px 2px #7edbea;
      }
    }
  }
  .contact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    .title {
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      color: #ffffff;
    }
    .desc {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
    }
    .inputbox {
      position: relative;
      button {
        background: #b13eb3;
        border-radius: 30px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 17px;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
        padding: 12px 20px;
        cursor: pointer;
        transition: all 0.4s;
        &:hover {
          transform: translateY(-54%);
          text-shadow: 2px 1.5px 2px #b13eb3;
        }
        &:active {
          transform: translateY(-52%);
          text-shadow: 2px 1.75px 2px #b13eb3;
        }
      }
      input {
        color: black;
        background: #ffffff;
        border-radius: 30px;
        width: 382px;
        height: 67px;
        padding: 0px 26px;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #000000;
        &:placeholder {
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #000000;
        }
      }
    }
  }
`;

const CopyRight = styled.div`
  background: #1b1122;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: #ffffff;
  padding: 34px 0px;
`;

function Footer() {
  const [feature, setFeature] = useState();
  const [roadmap, setRoadmap] = useState();
  useEffect(() => {
    const feature = document.querySelector("#feature");
    const roadmap = document.querySelector("#roadmap");
    if (feature && roadmap) {
      setFeature(feature);
      setRoadmap(roadmap);
    }
  }, []);
  return (
    <>
      <Wrapper>
        <div className="about">
          <img src={logo} alt="logo" />
          <p>
            founded with the goal of revolutionizing the world of memes and
            making them into valuable digital assets. Our team consists of
            experienced developers, designers, and meme enthusiasts who are
            passionate about bringing this vision to life.
          </p>
        </div>
        <div className="links">
          <p>Explore</p>
          <p onClick={() => feature.scrollIntoView()}>Features</p>
          <p onClick={() => roadmap.scrollIntoView()}>RoadMap</p>
        </div>
        <div className="contact">
          <div className="title">Stay Informed</div>
          <div className="desc">To get the latest news Informations:</div>
          <div className="inputbox">
            <input type="text" placeholder="Enter your Email" />
            <button>Subscribe</button>
          </div>
        </div>
      </Wrapper>
      <CopyRight>© 2023, ALL RIGHTS RESERVED MEMENATION INC.</CopyRight>
    </>
  );
}

export default Footer;
