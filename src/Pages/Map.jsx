import styled from "styled-components";
import MapBox from "../Components/Map";
import TimeLine from "../Components/Timeline";
import TimelineSpeedSelector from "../Components/TimelineSpeedSelector";
import GranularitySelector from "../Components/GranularitySelector";
import { rem } from "polished";
import { useState, useDispatch } from "../hooks/useReducer";
import { calculateDateFromRatio } from "../utils/time";

const TimeContainer = styled.div`
  ${({ theme }) => `
      position: absolute;
      left: 0;
      top:0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      padding: ${rem(24)};
      color: black;
    `}
`;

const TimelineButtonPanel = styled.aside`
  ${({ theme }) => `
      position: absolute;
      bottom: ${rem(24)};
      right:0;
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

function Map() {
  const { playing, time, timelineSettings } = useState();
  const { year, monthNumber, month, week, dayNumber, dayOfWeek, timestamp } =
    calculateDateFromRatio(timelineSettings, time);
  const dispatch = useDispatch();

  const handlePlayPause = () => {
    if (playing === "play") {
      dispatch({ type: "PAUSE_TIME" });
    } else {
      dispatch({ type: "PLAY_TIME" });
    }
  };

  return (
    <>
      {/* <MapBox /> */}
      <TimeContainer>
        <div>Absolute Time: {time} </div>
        <div>dayNumber: {dayNumber}</div>
        <div>dayOfWeek: {dayOfWeek}</div>
        <div>Week number: {week}</div>
        <div>monthNumber: {monthNumber}</div>
        <div>month: {month}</div>
        <div>Year: {year}</div>
        <div>Cureent timestamp: {timestamp}</div>
      </TimeContainer>
      <GranularitySelector />
      <TimelineSpeedSelector />
      <TimelineButtonPanel>
        <button
          onClick={handlePlayPause}
          id={playing === "play" ? "pause" : "play"}
        >
          {playing === "play" ? "pause" : "play"}
        </button>
      </TimelineButtonPanel>
      <TimeLine />
    </>
  );
}

export default Map;
