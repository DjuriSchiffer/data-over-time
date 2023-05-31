export const initialStore = {
  time: 0,
  playing: "pause", // enum: pause play resume
  speed: 0.0005,
};

export const reducer = (state, action) => {
  switch (action.type) {
    /*
     * Update time value
     */
    case "UPDATE_TIME":
      return {
        ...state,
        time: Math.round(action.payload * 40000) / 40000,
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
      const futureTime = state.time + state.speed;
      if (futureTime > 1) {
        return { ...state, time: 1, playing: "pause" };
      }

      return {
        ...state,
        time: Math.round(futureTime * 40000) / 40000,
      };
    case "TOGGLE_SPEED_SLOW":
      return { ...state, speed: calcSpeed(0.5) };
    case "TOGGLE_SPEED_NORMAL":
      return { ...state, speed: calcSpeed(1) };
    case "TOGGLE_SPEED_FAST":
      return { ...state, speed: calcSpeed(2) };

    /*
     * Initial error handling
     */
    case "SET_ERROR":
      return { ...state, error: true };
    default:
      return state;
  }
};
