import React from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import styled from "styled-components";
import { rem } from "polished";

const StyledTimelineSpeedSelector = styled.div`
  ${({ theme }) => `
      position: absolute;
      bottom: ${rem(24)};
      right: 80px;
      z-index: 9999;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: ${rem(24)} ${rem(24)} 0 0;
      @media only screen and (min-width: ${theme.breakPoint}px) {
        bottom: ${rem(80)};
      }
    `}
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const TimelineSpeedSelector = () => {
  const { timelineSpeed } = useGlobalState();
  const dispatch = useDispatch();

  const handleTimelineSpeedChange = (event) => {
    const newTimelineSpeed = event.target.value;

    dispatch({
      type: "UPDATE_TIMELINE_SPEED",
      payload: newTimelineSpeed,
    });
  };

  return (
    <StyledTimelineSpeedSelector>
      <RadioLabel>
        <RadioInput
          type="radio"
          value="REAL_TIME"
          checked={timelineSpeed === "REAL_TIME"}
          onChange={handleTimelineSpeedChange}
        />
        Real time
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          value="ONE_SECOND"
          checked={timelineSpeed === "ONE_SECOND"}
          onChange={handleTimelineSpeedChange}
        />
        One second
      </RadioLabel>
    </StyledTimelineSpeedSelector>
  );
};

export default TimelineSpeedSelector;
