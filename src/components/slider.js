import React from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 20px;
`;

const StyledThumb = styled.div`
  height: 40px;
  line-height: 40px;
  width: 40px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  transform: translateY(-10px);
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props =>
    props.index === 2 ? "#CCC" : props.index === 1 ? "#5A5AFF" : "#CCC"};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export default ({ min, max, ...delegated }) => {
  return (
    <StyledSlider
      min={1000}
      max={300000}
      defaultValue={[min, max]}
      renderTrack={Track}
      renderThumb={Thumb}
      {...delegated}
    />
  );
};
