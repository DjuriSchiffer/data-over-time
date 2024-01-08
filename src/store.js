import records from "./assets/Records.json";
import { prepareMapData } from "./utils/prepareData";
import { calculateRatioFromGranularity, getTotalDays } from "./utils/time";

const timelineSettings = {
  start: new Date("1900-01-01T00:00:00Z").getTime(),
  end: new Date("2000-01-01T00:00:00Z").getTime(),
  increment: 5,
};

export const initialStore = {
  time: 0,
  playing: "pause", // enum: pause play resume
  timelineSettings: timelineSettings,
  timelineSpeed: "REAL_TIME",
  granularity: "day",
  mapData: prepareMapData(records.locations),
};

export const reducer = (state, action) => {
  switch (action.type) {
    /*
     * Update time value
     */
    case "UPDATE_TIME":
      return {
        ...state,
        time:
          Math.round(action.payload * getTotalDays(timelineSettings)) /
          getTotalDays(timelineSettings),
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
      const futureTime =
        state.time +
        calculateRatioFromGranularity(state.granularity, timelineSettings);
      if (futureTime > 1) {
        return { ...state, time: 1, playing: "pause" };
      }

      return {
        ...state,
        time:
          Math.round(futureTime * getTotalDays(timelineSettings)) /
          getTotalDays(timelineSettings),
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
