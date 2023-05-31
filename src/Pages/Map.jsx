import styled from "styled-components";
import MapBox from "../Components/Map";
import TimeLine from "../Components/Timeline";
import { rem } from "polished";
import { useState, useDispatch } from "../hooks/useReducer";

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
  const { playing } = useState();
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
      <MapBox />
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
