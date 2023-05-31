import { useRef, useState, useEffect } from "react";
import { useState as useGlobalState, useDispatch } from "../hooks/useReducer";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import data from "../assets/mapdata";
import fake from "../assets/fakedata";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_API;

const StyledMap = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: opacity ease 0.3s;
`;

const buildMapData = (data) => {
  const json = {};
  let index = 0;
  let reverse = false;

  for (let x = 0; x <= 40000; x++) {
    const time = x / 40000;
    console.log(data[index], x, index);

    if (reverse) {
      index--;
    } else {
      index++;
    }

    if (index >= data.length) {
      // Reached the end of the second array
      index = data.length - 2; // Start from the second-to-last item
      reverse = true;
    }

    if (index < 0) {
      // Reached the beginning of the second array in reverse mode
      index = 1; // Start from the second item
      reverse = false;
    }

    json[time] = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: data[index],
      },
    };
  }

  return json;
};

const Map = () => {
  const { time } = useGlobalState();
  const [loaded, setLoaded] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-84.27002);
  const [lat, setLat] = useState(37.839333);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/djuri-schiffer/clibphjw500z301pge2ndcre2",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      // Create (empty) source on map.
      map.current.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // Add points layer from imported json.
      map.current.addLayer({
        id: "apoint",
        source: "points",
        type: "circle",
        paint: {
          "circle-color": "#10b981",
        },
      });

      // console.log("fake", fake.features[0].geometry.coordinates);
      // const mapData = buildMapData(fake.features[0].geometry.coordinates);
      // console.log(mapData);

      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      map.current.getSource("points").setData(data[time]);
    }
  }, [time, loaded, map.current]);

  return <StyledMap ref={mapContainer} />;
};

export default Map;
