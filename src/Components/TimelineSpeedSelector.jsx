import React from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import styled from "styled-components";
import { rem } from "polished";

const StyledTimelineSpeedSelector = styled.div`
  ${({ theme }) => `
     
      right: 80px;
      z-index: 9999;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: white;
      margin: 0 1.5rem;
    `}
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
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
