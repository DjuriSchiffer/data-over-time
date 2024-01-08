import React, { useState } from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import styled from "styled-components";

const StyledGranularitySelector = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const GranularitySelector = () => {
  const { granularity } = useGlobalState();
  const dispatch = useDispatch();

  const handleGranularityChange = (event) => {
    const newGranularity = event.target.value;

    dispatch({
      type: "UPDATE_GRANULARITY",
      payload: newGranularity,
    });
  };

  return (
    <StyledGranularitySelector>
      <RadioLabel>
        <RadioInput
          type="radio"
          value="day"
          checked={granularity === "day"}
          onChange={handleGranularityChange}
        />
        Day
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          value="week"
          checked={granularity === "week"}
          onChange={handleGranularityChange}
        />
        Week
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          value="month"
          checked={granularity === "month"}
          onChange={handleGranularityChange}
        />
        Month
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          value="year"
          checked={granularity === "year"}
          onChange={handleGranularityChange}
        />
        Year
      </RadioLabel>
    </StyledGranularitySelector>
  );
};

export default GranularitySelector;