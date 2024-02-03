import React, { useState, useRef, useEffect } from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import styled from "styled-components";
import Icon from "./Icon";
import { rem } from "polished";
import { TimelinePlayerButton } from "./Timeline";

const StyledGranularitySelector = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  margin: 0 ${rem(8)};
`;

const Panel = styled.div`
  ${({ theme }) =>
    `
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
  margin: 0 ${rem(4)}${rem(4)};
`;

const RadioInput = styled.input`
  margin-right: ${rem(4)};
`;

const GranularitySelector = () => {
  const { granularity } = useGlobalState();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closePanel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePanel = () => {
    console.log("isOpen", isOpen);
    setIsOpen(!isOpen);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  const handleGranularityChange = (event) => {
    const newGranularity = event.target.value;
    dispatch({
      type: "UPDATE_GRANULARITY",
      payload: newGranularity,
    });
    closePanel();
  };

  return (
    <StyledGranularitySelector ref={containerRef}>
      <TimelinePlayerButton onClick={togglePanel}>
        <Icon id={"FastForward"} color={"white"} />
      </TimelinePlayerButton>
      {isOpen && (
        <Panel>
          {["hour", "day", "week", "month", "year"].map((period) => (
            <RadioLabel key={period}>
              <RadioInput
                type="radio"
                name="granularity"
                value={period}
                checked={granularity === period}
                onChange={handleGranularityChange}
              />
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </RadioLabel>
          ))}
        </Panel>
      )}
    </StyledGranularitySelector>
  );
};

export default GranularitySelector;
