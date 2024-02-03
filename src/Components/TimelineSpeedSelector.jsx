import React, { useState, useRef, useEffect } from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import styled from "styled-components";
import Icon from "./Icon";
import { rem } from "polished";
import { TimelinePlayerButton } from "./Timeline";

const StyledTimelineSpeedSelector = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const Panel = styled.div`
  ${({ theme }) => `
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: ${rem(12)};
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.background.dark};
  `}
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0 ${rem(4)} ${rem(4)};
`;

const RadioInput = styled.input`
  margin-right: ${rem(4)};
`;

const TimelineSpeedSelector = () => {
  const { timelineSpeed } = useGlobalState();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimelineSpeedChange = (event) => {
    const newTimelineSpeed = event.target.value;
    dispatch({
      type: "UPDATE_TIMELINE_SPEED",
      payload: newTimelineSpeed,
    });
    setIsOpen(false); // Close the panel upon selection
  };

  return (
    <StyledTimelineSpeedSelector ref={containerRef}>
      <TimelinePlayerButton onClick={() => setIsOpen(!isOpen)}>
        <Icon id={"Clock"} color={"white"} />
      </TimelinePlayerButton>
      {isOpen && (
        <Panel>
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
        </Panel>
      )}
    </StyledTimelineSpeedSelector>
  );
};

export default TimelineSpeedSelector;
