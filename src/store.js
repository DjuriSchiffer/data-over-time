import { calculateRatioFromGranularity } from "./utils/time";
import data from "./data/dummydata.json";

const timelineSettings = {
  start: new Date("2000-01-01T00:00:00Z").getTime(),
  end: Date.now(),
};

export const initialStore = {
  time: 0,
  playing: "pause", // enum: pause play resume
  timelineSettings: timelineSettings,
  timelineSpeed: "REAL_TIME",
  granularity: "week",
  appData: data,
};

export const reducer = (state, action) => {
  switch (action.type) {
    /*
     * Update time value
     */
    case "UPDATE_TIME":
      return {
        ...state,
        time: action.payload,
      };

    case "UPDATE_TIMELINE_SPEED":
      return {
        ...state,
        timelineSpeed: action.payload,
      };
    /*
     * Update granularity
     */
    case "UPDATE_GRANULARITY":
      return {
        ...state,
        granularity: action.payload,
      };
    /*
     * Update time player
     */
    case "PLAY_TIME":
      return {
        ...state,
        playing: "play",
      };
    case "PAUSE_TIME":
      return {
        ...state,
        playing: "pause",
      };
    case "INTERVAL_TIME":
      const increment = calculateRatioFromGranularity(
        state.granularity,
        timelineSettings
      );
      const futureTime = state.time + increment;

      // Ensure time doesn't exceed the end of the timeline
      if (futureTime > 1) {
        return { ...state, time: 1, playing: "pause" };
      }

      return {
        ...state,
        time: futureTime,
      };

    /*
     * Initial error handling
     */
    case "SET_ERROR":
      return { ...state, error: true };
    default:
      return state;
  }
};
