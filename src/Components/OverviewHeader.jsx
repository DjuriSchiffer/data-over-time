import styled from "styled-components";
import { rem } from "polished";
import { calculateDateFromRatio, MONTH_NAMES } from "../utils/time";
import { useState } from "../hooks/useReducer";

const StyledHeader = styled.div`
  ${({ theme }) => `
    width: 100%;
    background-color: ${theme.color.background.dark};
    height: ${rem(40)};
    color: white;
    padding: ${rem(12)};
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: space-between;
   `}
`;

const OverviewHeader = () => {
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

  const startDate = new Date(timelineSettings.start);
  const endDate = new Date(timelineSettings.end);

  return (
    <StyledHeader>
      <div>
        Start:
        {`${startDate.getDate()}-${
          MONTH_NAMES[startDate.getMonth()]
        }-${startDate.getFullYear()}`}
      </div>
      <div>Current: {`${dayNumber}-${month}-${year}`}</div>{" "}
      <div>
        End:
        {`${endDate.getDate()}-${
          MONTH_NAMES[endDate.getMonth()]
        }-${endDate.getFullYear()}`}
      </div>
    </StyledHeader>
  );
};

export default OverviewHeader;
