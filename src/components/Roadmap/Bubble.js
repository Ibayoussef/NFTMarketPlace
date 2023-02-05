import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 40%;
  padding: 30px 40px;
  top: ${(props) => props.mt};
  left: ${(props) => props.ml};
  height: 10%;
  z-index: 99999;
  background: linear-gradient(180deg, #1f607a 0%, #5f2fc0 66.67%, #7f16e3 100%);
  color: white;
  /* &:after {
      content: ""; 
            position: absolute;
      top: ${(props) => props.arrowParams.mt};
      left: ${(props) => props.arrowParams.ml};
      width: 61px;
      height: 106px;
      z-index: 99;
      background: linear-gradient(
        180deg,
        #5f2fc0 0%,
        rgba(127, 22, 227, 0.5) 100%,
        rgba(127, 22, 227, 1) 60%
      );
      transform: ${(props) => props.arrowParams.rotate};
      clip-path: polygon(100% 100%, 0 97%, 52% 0);
    }
    } */
  .title {
    font-weight: 500;
    font-size: 0.8rem;

    line-height: 36px;
  }
  .description {
    font-weight: 400;
    font-size: 0.6rem;

    line-height: 24px;
  }
`;

function Bubble({ title, desc, mt, ml, arrowParams }) {
  return (
    <Wrapper mt={mt} ml={ml} arrowParams={arrowParams}>
      <h2 className="title">{title}</h2>
      <p className="description">{desc}</p>
    </Wrapper>
  );
}

export default Bubble;
