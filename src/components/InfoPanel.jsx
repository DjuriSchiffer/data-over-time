import { rem } from "polished";
import styled from "styled-components";
import {
  calculateDateFromRatio,
  calculateRatioFromGranularity,
} from "../utils/time";
import { useState } from "../hooks/useReducer";

const StyledInfoPanel = styled.div`
  ${({ theme }) => `
    background-color: ${theme.color.background.dark};
    height: 100%;
    width: 100%;
    color: white;
   `}
`;

const InfoPanel = () => {
  const { time, timelineSettings, granularity } = useState();
  const {
    year,
    monthNumber,
    month,
    week,
    dayNumber,
    dayOfWeek,
    hours,
    minutes,
    seconds,
    timestamp,
  } = calculateDateFromRatio(timelineSettings, time);

  return (
    <StyledInfoPanel>
      <div>Absolute Time: {time} </div>
      <div>seconds: {seconds} </div>
      <div>minutes: {minutes} </div>
      <div>hours: {hours} </div>
      <div>dayNumber: {dayNumber}</div>
      <div>dayOfWeek: {dayOfWeek}</div>
      <div>Week number: {week}</div>
      <div>monthNumber: {monthNumber}</div>
      <div>month: {month}</div>
      <div>Year: {year}</div>
      <div>Cureent timestamp: {timestamp}</div>
      <div>
        Granularity:{" "}
        {calculateRatioFromGranularity(granularity, timelineSettings)}
      </div>
    </StyledInfoPanel>
  );
};

export default InfoPanel;