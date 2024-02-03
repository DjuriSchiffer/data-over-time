import styled from "styled-components";
import { rem } from "polished";
import { useState, useRef, useEffect, useCallback } from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import { isMobile } from "react-device-detect";
import TimelineSpeedSelector from "./TimelineSpeedSelector";
import GranularitySelector from "./GranularitySelector";

const TimelineButtonPanel = styled.aside`
  ${({ theme }) => `
      z-index: 9999;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `}
`;

const StyledTooltip = styled.span`
  ${({ theme }) =>
    `
    position: absolute;
    width: ${rem(12)};
    height: ${rem(12)};
    top: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.color.key.default};
    border: ${rem(1)} solid ${theme.color.key.default};
    cursor: pointer;
    user-select: none;
    z-index: 100;
`}
`;

const TimelineNavigation = styled.div`
  ${({ theme }) =>
    `
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: ${theme.color.background.dark};
  
`}
`;

const StyledTimeLineWrapper = styled.div`
  margin: 0 1.5rem;
  position: relative;
  height: 40px;
  width: 50%;
`;

const StyledTimeLine = styled.div`
  ${({ theme, $style }) =>
    `
    pointer-events: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    opacity: 1;
   
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: ${rem(4)};
      border: 1px solid ${theme.color.key.default};
      background-color: ${theme.color.key.white};
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    &:after {
      content: '';
      position: absolute;
      width: ${$style};
      height: ${rem(4)};
      left: 0;
      top: 50%;
      background-color: ${theme.color.key.default};
      transform: translateY(-50%);
      cursor: pointer;
    }
  `}
`;
const TimeLine = () => {
  const { time, playing, timelineSpeed } = useGlobalState();
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const ref = useRef();

  console.log(time);

  const handleEvent = useCallback(
    (event, isTouch) => {
      if (ref.current) {
        const clientX = isTouch ? event.touches[0].clientX : event.clientX;
        const { x, width } = ref.current.getBoundingClientRect();
        const newTime = Math.max(
          0,
          Math.min(1, (clientX - x - 24) / (width - 48))
        );
        dispatch({ type: "UPDATE_TIME", payload: newTime });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const handleDrag = (event) => handleEvent(event, isMobile);
    const eventType = isMobile ? "touchmove" : "mousemove";
    const endEventType = isMobile ? "touchend" : "mouseup";

    if (dragging) {
      document.addEventListener(eventType, handleDrag);
      document.addEventListener(endEventType, () => setDragging(false));
    } else {
      document.removeEventListener(eventType, handleDrag);
    }

    return () => document.removeEventListener(eventType, handleDrag);
  }, [dragging, handleEvent]);

  useEffect(() => {
    let animationFrameId = null;
    let playIntervalId = null;

    const animate = () => {
      dispatch({ type: "INTERVAL_TIME" });
      animationFrameId = requestAnimationFrame(animate);
    };

    if (playing === "play") {
      if (timelineSpeed === "REAL_TIME") {
        animate();
      } else {
        playIntervalId = setInterval(() => {
          dispatch({ type: "INTERVAL_TIME" });
        }, 1000);
      }
    } else {
      // Cleanup
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (playIntervalId !== null) {
        clearInterval(playIntervalId);
      }
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (playIntervalId !== null) {
        clearInterval(playIntervalId);
      }
    };
  }, [playing, dispatch, timelineSpeed]);

  const handleTimeLineClick = (event) => handleEvent(event, false);
  const handleTooltipDown = () => setDragging(true);
  const handlePlayPause = () => {
    if (playing === "play") {
      dispatch({ type: "PAUSE_TIME" });
    } else {
      dispatch({ type: "PLAY_TIME" });
    }
  };

  return (
    <TimelineNavigation>
      <TimelineButtonPanel>
        <button
          onClick={handlePlayPause}
          id={playing === "play" ? "pause" : "play"}
        >
          {playing === "play" ? "pause" : "play"}
        </button>
      </TimelineButtonPanel>
      <StyledTimeLineWrapper>
        <StyledTimeLine
          onMouseDown={handleTimeLineClick}
          onTouchStart={handleTooltipDown}
          ref={ref}
          $style={`${time * 100}%`}
        >
          <StyledTooltip
            style={{ left: `${time * 100}%` }}
            onMouseDown={handleTooltipDown}
            onMouseUp={() => setDragging(false)}
            onTouchEnd={() => setDragging(false)}
          />
        </StyledTimeLine>
      </StyledTimeLineWrapper>
      <TimelineSpeedSelector />
      <GranularitySelector />
    </TimelineNavigation>
  );
};

export default TimeLine;
