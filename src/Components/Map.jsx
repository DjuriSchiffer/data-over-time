import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_API;

console.log(import.meta.env.VITE_MAP_BOX_API);

const StyledMap = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #cbd2d3;
  transition: opacity ease 0.3s;
`;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-52.23);
  const [lat, setLat] = useState(4.55);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return <StyledMap ref={mapContainer} />;
};

export default Map;
