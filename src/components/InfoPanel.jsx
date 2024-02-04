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
    overflow: hidden;
    padding: 0 24px;
   `}
`;

const StyledDate = styled.div`
  div {
    margin: 4px 0;
    padding: 4px;
    width: 100%;
    display: flex;
    font-size: 14px;
  }

  .time-unit {
    font-weight: bold;
  }

  .time-value {
    color: white;
    margin-left: 4px;
  }
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
      <StyledDate>
        <div className="time-unit">
          Seconds: <span className="time-value">{seconds}</span>
        </div>
        <div className="time-unit">
          Minutes: <span className="time-value">{minutes}</span>
        </div>
        <div className="time-unit">
          Hours: <span className="time-value">{hours}</span>
        </div>
        <div className="time-unit">
          Day Number: <span className="time-value">{dayNumber}</span>
        </div>
        <div className="time-unit">
          Day of Week: <span className="time-value">{dayOfWeek}</span>
        </div>
        <div className="time-unit">
          Week Number: <span className="time-value">{week}</span>
        </div>
        <div className="time-unit">
          Month Number: <span className="time-value">{monthNumber}</span>
        </div>
        <div className="time-unit">
          Month: <span className="time-value">{month}</span>
        </div>
        <div className="time-unit">
          Year: <span className="time-value">{year}</span>
        </div>
        <div className="time-unit">
          Absolute Time: <span className="time-value">{time}</span>
        </div>
        <div className="time-unit">
          Cureent timestamp: : <span className="time-value">{timestamp}</span>
        </div>
        <div className="time-unit">
          Granularity: <span className="time-value">{granularity}</span>
        </div>
        <div className="time-unit">
          Granularity step:{" "}
          <span className="time-value">
            {calculateRatioFromGranularity(granularity, timelineSettings)}
          </span>
        </div>
      </StyledDate>
    </StyledInfoPanel>
  );
};

export default InfoPanel;
