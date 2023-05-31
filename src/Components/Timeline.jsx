import styled from "styled-components";
import { rem } from "polished";
import { useState, useRef, useEffect } from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import { isMobile } from "react-device-detect";

const timelineSettings = {
  start: 1900,
  end: 2023,
  increment: 5,
};

export const fromRatio = (ratio) => {
  return (
    timelineSettings.start +
    Math.floor(ratio * (timelineSettings.end - timelineSettings.start))
  );
};

const StyledTooltipLabel = styled.span`
  ${({ theme }) => `
    position: absolute;
    left: ${rem(-40)};
    width: ${rem(82)};
    top: ${rem(-25)};
    height: ${rem(35)};
    background-color: ${theme.color.date.xLight};
    border: ${rem(1)} solid ${theme.color.date.default};
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: ${theme.color.date.default};
    cursor: pointer;
    user-select: none;
    &:after, &:before {
      top: 100%;
      left: 50%;
      border: solid transparent;
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }
    &:after {
      border-color: rgba(136, 183, 213, 0);
      border-top-color: ${theme.color.date.xLight};
      border-width: 5px;
      margin-left: -5px;
    }
    &:before {
      border-color: rgba(194, 225, 245, 0);
      border-top-color: ${theme.color.date.default};
      border-width: 6px;
      margin-left: -6px;
    }
  `}
`;

const StyledTooltipWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${rem(24)};
  right: ${rem(24)};
`;

const StyledTooltip = styled.span`
  ${({ theme }) =>
    `
    position: absolute;
    top: 0;
    width: ${rem(2)};
    height: ${rem(72)};
    background-color: ${theme.color.date.default};
`}
`;

const StyledTimeLine = styled.div`
  ${({ theme }) =>
    `
    pointer-events: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${rem(56)};
    z-index: 2000;
    background-color: ${theme.color.key.white};
    padding: ${rem(16)} ${rem(24)};
    &:before {
      content: '';
      position: absolute;
      left: ${rem(24)};
      right: ${rem(24)};
      height: ${rem(1)};
      background-color: ${theme.color.key.default};
      top: ${rem(22)};
    }
    &:after {
      content: '';
      position: absolute;
      width: ${rem(2)};
      height: ${rem(12)};
      right: ${rem(22)};
      top: ${rem(16)};
      background-color: ${theme.color.key.default};
    }
    @media only screen and (min-width: ${theme.breakPoint}px) {
      opacity: 1;
      pointer-events: auto;
      height: ${rem(72)};
    }
  `}
`;

const StyledTime = styled.div`
  ${({ theme }) => `
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
  `}
`;

const StyledLabelDot = styled.div`
  ${({ theme, $label = null, $first = false, $last = false }) => `
    position: relative;
    width: ${$label === null ? rem(1) : $last ? 0 : rem(2)};
    height: ${$label === null ? rem(5) : rem(12)};
    top: ${$label === null ? rem(2) : 0};
    background-color: ${theme.color.key.default};
    ${
      $label !== null
        ? `
        &::after {
          content: '${$label}';
          position: absolute;
          top: ${rem(20)};
          width: ${rem(28)};
          left: ${$first ? 0 : $last ? rem(-28) : rem(-14)};
          opacity: ${$first ? 1 : $last ? 1 : 0};
          @media only screen and (min-width: ${theme.breakPoint}px) {
            opacity: 1;
          }
        }
    `
        : ""
    }
  `}
`;

const Time = () => {
  const points = [];
  for (let i = timelineSettings.start; i <= timelineSettings.end; i += 1) {
    points.push(
      <StyledLabelDot
        key={i}
        $label={i % timelineSettings.increment === 0 ? i : null}
        $first={i === timelineSettings.start}
        $last={i === timelineSettings.end}
      ></StyledLabelDot>
    );
  }
  return <StyledTime>{points}</StyledTime>;
};

const TimeLine = () => {
  const { time, playing } = useGlobalState();
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleDrag(event) {
      if (!!ref.current) {
        const { clientX } = isMobile ? event.touches[0] : event;
        const { x, width } = ref.current.getBoundingClientRect();
        dispatch({
          type: "UPDATE_TIME",
          payload: Math.max(0, Math.min(1, (clientX - x - 24) / (width - 48))),
        });
      }
    }

    if (!isMobile) {
      if (dragging) {
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", () => {
          setDragging(false);
        });
      } else {
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("touchmove", handleDrag);
      }
      return () => {
        document.removeEventListener("mousemove", handleDrag);
      };
    } else {
      if (dragging) {
        document.addEventListener("touchmove", handleDrag);
        document.addEventListener("touchend", () => {
          setDragging(false);
        });
      } else {
        document.removeEventListener("touchmove", handleDrag);
      }
      return () => {
        document.removeEventListener("touchmove", handleDrag);
      };
    }
  }, [dragging, dispatch]);

  useEffect(() => {
    let playIntervalId = null;

    if (playing === "play") {
      playIntervalId = setInterval(() => {
        dispatch({ type: "INTERVAL_TIME" });
      }, 33);
    } else {
      if (playIntervalId !== null) {
        clearInterval(playIntervalId);
      }
    }

    return () => {
      if (playIntervalId !== null) {
        clearInterval(playIntervalId);
      }
    };
  }, [playing, dispatch]);

  const setTime = (value) => {
    dispatch({ type: "UPDATE_TIME", payload: value });
  };

  const handleTimeLineClick = (event) => {
    if (!!ref.current) {
      const { clientX } = event;
      const { x, width } = ref.current.getBoundingClientRect();
      setTime(Math.max(0, Math.min(1, (clientX - x - 24) / (width - 48))));
    }
  };

  const handleTooltipDown = (event) => {
    event.stopPropagation();
    setDragging(true);
  };

  const handleTooltipUp = (event) => {
    event.stopPropagation();
    setDragging(false);
  };

  return (
    <StyledTimeLine
      onMouseDown={handleTimeLineClick}
      onTouchStart={handleTooltipDown}
      ref={ref}
    >
      <Time />
      <StyledTooltipWrapper>
        <StyledTooltip style={{ left: `${time * 100}%` }}>
          <StyledTooltipLabel
            onMouseDown={handleTooltipDown}
            onMouseUp={handleTooltipUp}
            onTouchStart={handleTooltipDown}
            onTouchEnd={handleTooltipUp}
          >
            {fromRatio(time)}
          </StyledTooltipLabel>
        </StyledTooltip>
      </StyledTooltipWrapper>
    </StyledTimeLine>
  );
};

export default TimeLine;
