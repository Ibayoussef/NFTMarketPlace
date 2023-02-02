import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 437px;
  padding: 30px 40px;
  top: ${(props) => props.mt};
  left: ${(props) => props.ml};
  height: 246px;
  z-index: 99999;
  background: linear-gradient(180deg, #1f607a 0%, #5f2fc0 66.67%, #7f16e3 100%);
  color: white;
  .title {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
  }
  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  .arrowwrapper {
    position: relative;
    width: 100%;
    z-index: 99;
    .arrow {
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
  }
`;

function Bubble({ title, desc, mt, ml, arrowParams }) {
  return (
    <Wrapper mt={mt} ml={ml} arrowParams={arrowParams}>
      <h2 className="title">{title}</h2>
      <p className="description">{desc}</p>
      <div className="arrowwrapper">
        <div className="arrow"></div>
      </div>
    </Wrapper>
  );
}

export default Bubble;
