import { rem } from "polished";
import {
  calculateDateFromRatio,
  calculateRatioFromGranularity,
} from "../utils/time";
import { useState } from "../hooks/useReducer";
import styled from "styled-components";

const StyledInfoPanel = styled.div`
  ${({ theme }) => `
    background-color: ${theme.color.background.dark};
    height: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    height: 50vh;
    width: 50vw;
    color: white;
    padding: ${rem(12)};
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
