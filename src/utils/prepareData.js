function roundToStep(timestamp, step) {
  return Math.ceil(timestamp / step) * step;
}

const parseTimestamp = (timestamp) => {
  return Date.parse(timestamp) / 1000;
};

const calculateRelativeTimestamp = (
  currentTimestamp,
  startTimestamp,
  endTimestamp
) => {
  const totalDuration = endTimestamp - startTimestamp;
  const durationElapsed = currentTimestamp - startTimestamp;
  const relativeTimestamp = durationElapsed / totalDuration;
  return roundToStep(relativeTimestamp, 0.0005);
};
const convertToValidCoordinates = (lng, lat) => {
  const latitude = lat / 1e7;
  const longitude = lng / 1e7;
  return [longitude, latitude];
};

export const prepareMapData = (data) => {
  const json = {};
  const firstItem = data[0];
  const lastItem = data[data.length - 1];
  const firstTimestamp = parseTimestamp(firstItem.timestamp);
  const lastTimestamp = parseTimestamp(lastItem.timestamp);

  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];
    const timestamp = parseTimestamp(currentItem.timestamp);
    const relativeTimestamp = calculateRelativeTimestamp(
      timestamp,
      firstTimestamp,
      lastTimestamp
    );

    json[relativeTimestamp] = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: convertToValidCoordinates(
          currentItem.longitudeE7,
          currentItem.latitudeE7
        ),
      },
    };
  }
  return json;
};
