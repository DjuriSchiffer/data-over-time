import { useRef, useEffect, useState } from "react";
import { useState as useGlobalState } from "../hooks/useReducer";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import { calculateDateFromRatio } from "../utils/time";

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
  const { time, appData, timelineSettings } = useGlobalState();
  const { year } = calculateDateFromRatio(timelineSettings, time);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isMapInitialized, setMapInitialized] = useState(false);
  const [layersInitialized, setLayersInitialized] = useState(false);

  const provincesColors = {
    Groningen: "rgba(255, 99, 132, 0.5)",
    Fryslân: "rgba(54, 162, 235, 0.5)",
    Drenthe: "rgba(255, 206, 86, 0.5)",
    Overijssel: "rgba(75, 192, 192, 0.5)",
    Flevoland: "rgba(153, 102, 255, 0.5)",
    Gelderland: "rgba(255, 159, 64, 0.5)",
    Utrecht: "rgba(199, 199, 199, 0.5)",
    "Noord-Holland": "rgba(199, 199, 199, 0.5)",
    "Zuid-Holland": "rgba(199, 199, 199, 0.5)",
    Zeeland: "rgba(199, 199, 199, 0.5)",
    "Noord-Brabant": "rgba(199, 199, 199, 0.5)",
    Limburg: "rgba(199, 199, 199, 0.5)",
  };

  const provincesCenters = {
    Groningen: [6.8007, 53.2],
    Fryslân: [5.8, 53.1],
    Drenthe: [6.6, 52.9],
    Overijssel: [6.4, 52.5],
    Flevoland: [5.5, 52.5],
    Gelderland: [5.9, 52.0],
    Utrecht: [5.2, 52.1],
    "Noord-Holland": [4.9, 52.6],
    "Zuid-Holland": [4.6, 52.0],
    Zeeland: [3.8, 51.3],
    "Noord-Brabant": [5.0, 51.5],
    Limburg: [5.9, 51.2],
  };

  // Initialize the map
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/djuri-schiffer/clibphjw500z301pge2ndcre2",
      center: [5.2913, 52.1326],
      zoom: 7,
    });

    map.current.on("load", () => {
      setMapInitialized(true);
    });
  }, []);

  // Add sources and layers after the map is initialized
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;

    Object.entries(provincesCenters).forEach((coords, index) => {
      const sourceId = `circleSource${index}`;

      map.current.addSource(`circleSource${index}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coords[1],
          },
        },
      });

      map.current.addLayer({
        id: `circle${index}`,
        source: `circleSource${index}`,
        type: "circle",
        paint: {
          "circle-radius": 0,
          "circle-color": provincesColors[coords[0]],
          "circle-opacity": 0.5,
        },
      });

      map.current.addLayer({
        id: `text${index}`,
        type: "symbol",
        source: sourceId,
        layout: {
          "text-field": "{totals}",
          "text-size": 12,
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 0,
          "text-justify": "auto",
        },
        paint: {
          "text-color": "#ffffff",
        },
      });
    });

    setLayersInitialized(true);
  }, [isMapInitialized]);

  useEffect(() => {
    if (!map.current || !layersInitialized || !appData) return;

    const dataForYear = appData[year];

    const maxPopulation = dataForYear
      ? Math.max(...dataForYear.map((data) => data.totals))
      : 0;
    const maxRadius = 50;

    if (dataForYear) {
      dataForYear.forEach(({ region, totals }) => {
        const provinceIndex = Object.keys(provincesCenters).indexOf(region);
        if (provinceIndex !== -1) {
          const populationPercentage = (totals / maxPopulation) * 100;
          const radius = populationPercentage * (maxRadius / 50);

          if (map.current.getLayer(`circle${provinceIndex}`)) {
            map.current.setPaintProperty(
              `circle${provinceIndex}`,
              "circle-radius",
              radius
            );
          }

          const sourceId = `circleSource${provinceIndex}`;
          const source = map.current.getSource(sourceId);
          if (source) {
            source.setData({
              type: "Feature",
              properties: { totals },
              geometry: {
                type: "Point",
                coordinates: provincesCenters[region],
              },
            });
          }
        }
      });
    }
  }, [year, layersInitialized, appData]);

  return <StyledMap ref={mapContainer} />;
};

export default MapBox;
