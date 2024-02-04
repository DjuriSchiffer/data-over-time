import { useRef, useEffect, useState } from "react";
import { useState as useGlobalState } from "../hooks/useReducer";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_API;

const StyledMap = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const MapBox = () => {
  const { time } = useGlobalState();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isMapInitialized, setMapInitialized] = useState(false);
  const [layersInitialized, setLayersInitialized] = useState(false);

  // Coordinates of the top 10 biggest cities in the Netherlands
  const cities = [
    [4.9041, 52.3676], // Amsterdam
    [4.4792, 51.9225], // Rotterdam
    [4.3007, 52.0705], // The Hague
    [5.1214, 52.0907], // Utrecht
    [5.4697, 51.4416], // Eindhoven
    [5.0913, 51.5555], // Tilburg
    [6.5665, 53.2194], // Groningen
    [5.2647, 52.3508], // Almere
    [4.7683, 51.5719], // Breda
    [5.8372, 51.8126], // Nijmegen
  ];

  // Initialize the map
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/djuri-schiffer/clibphjw500z301pge2ndcre2",
      center: [5.2913, 52.1326], // Centered roughly in the middle of the Netherlands
      zoom: 7,
    });

    map.current.on("load", () => {
      setMapInitialized(true);
    });
  }, []);

  // Add sources and layers after the map is initialized
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;

    cities.forEach((coords, index) => {
      console.log(coords);
      map.current.addSource(`circleSource${index}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coords,
          },
        },
      });

      map.current.addLayer({
        id: `circle${index}`,
        source: `circleSource${index}`,
        type: "circle",
        paint: {
          "circle-radius": 0,
          "circle-color": "#fac815",
          "circle-opacity": 0.5,
        },
      });
    });

    setLayersInitialized(true);
  }, [isMapInitialized]);

  // Update layer properties
  useEffect(() => {
    if (!map.current || !layersInitialized) return;

    cities.forEach((_, index) => {
      const circleThreshold = index * 0.1; // Starts at 0% for the first circle
      const newRadius = time >= circleThreshold ? (index + 1) * 5 : 0;

      if (map.current.getLayer(`circle${index}`)) {
        map.current.setPaintProperty(
          `circle${index}`,
          "circle-radius",
          newRadius
        );
      }
    });
  }, [time, layersInitialized]);

  return <StyledMap ref={mapContainer} />;
};

export default MapBox;
